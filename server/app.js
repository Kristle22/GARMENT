const express = require('express');
const app = express();
const port = 3003;

const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: '10mb' }));
const mysql = require("mysql");

const md5 = require('js-md5');
const uuid = require('uuid');
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "clothing_store",
});

// ///////////////DO AUTH////////////
const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf('/admin')) {
    // admin
    const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length || results[0].role !== 'admin') {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
    next();
  } else {
    // Front
    const sql = `
    SELECT
    name, role
    FROM users
    WHERE session = ?
`;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length) {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  }
}
app.use(doAuth)

//Auth
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
    requests = [req.headers['authorization'] || '', req.query.role];
  } else {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
    requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: 'error' });
    } else {
      res.send({ msg: 'ok' });
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
});

// //////////REQUESTS TO DB/////////
// READ Garment & queries FRONT&BACK
app.get('/rubai', (req, res) => {
  let sql;
  let requests;
  if (!req.query['color-id'] && !req.query['s']) {
    sql = `
  SELECT
  g.id, type, price, photo, c.title AS clothColor, c.hex_code AS hexCode, o.user_id AS userId, inCart, SUM(inCart = 1) AS totalSum, g.order_id AS orderId, GROUP_CONCAT(cm.com, '-^-^-') AS coms, COUNT(cm.com) AS com_count, rates, rate_sum 
  FROM garment AS g 
  LEFT JOIN colors  AS c
  ON g.color_id = c.id
  LEFT JOIN orders AS o
  ON g.order_id = o.id
  LEFT JOIN comments AS cm
  ON g.id = cm.cloth_id
  GROUP BY g.id
  `;
    requests = [];
  } else if (req.query['color-id']) {
    sql = `
    SELECT
    g.id, type, price, photo, c.title AS clothColor, c.hex_code AS hexCode, o.user_id AS userId, inCart, SUM(inCart = 1) AS totalSum, g.order_id AS orderId, GROUP_CONCAT(cm.com, '-^-^-') AS coms, COUNT(cm.com) AS com_count 
    FROM garment AS g 
    LEFT JOIN colors  AS c
    ON g.color_id = c.id
    LEFT JOIN orders AS o
    ON g.order_id = o.id
    LEFT JOIN comments AS cm
    ON g.id = cm.cloth_id
    GROUP BY g.id
  `;
    requests = [req.query['color-id']];
  } else {
    sql = `
    SELECT
    g.id, type, price, photo, c.title AS clothColor, c.hex_code AS hexCode, o.user_id AS userId, inCart, SUM(inCart = 1) AS totalSum, g.order_id AS orderId, GROUP_CONCAT(cm.com, '-^-^-') AS coms, COUNT(cm.com) AS com_count 
    FROM garment AS g 
    LEFT JOIN colors  AS c
    ON g.color_id = c.id
    LEFT JOIN orders AS o
    ON g.order_id = o.id
    LEFT JOIN comments AS cm
    ON g.id = cm.cloth_id
    GROUP BY g.id
    `;
    requests = ['%' + req.query['s'] + '%'];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ Colors FRONT&BACK
app.get('/spalvos', (req, res) => {
  const sql = `
  SELECT
  c.id, title, hex_code, g.color_id AS garment_id
  FROM garment AS g
  RIGHT JOIN colors AS c
  ON g.color_id = c.id
  GROUP BY c.id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ Orders & queries
app.get('/uzsakymai', (req, res) => {
  let sql
  let requests;
  if (!req.query['color-id'] && !req.query['s']) {
    sql = `
  SELECT
  o.id AS orderId, size, userCom, cloth_ids, orderSum, user_id, status, date, u.name AS user_name, u.email AS mail, g.id AS clothId, GROUP_CONCAT(type) AS cloth, GROUP_CONCAT(g.id) AS clothId, GROUP_CONCAT(price) AS prc, GROUP_CONCAT(g.photo, ' ') AS img, SUM(orderSum) AS ordersTotal
  FROM orders AS o
  LEFT JOIN garment  AS g
  ON o.id = g.order_id
  LEFT JOIN users AS u
  ON o.user_id = u.id
  GROUP BY o.id
  `;
    requests = [];
  } else if (req.query['color-id']) {
    sql = `
    SELECT
    o.id AS orderId, size, userCom, cloth_ids, orderSum, user_id, status, date, u.name AS user_name, u.email AS mail, g.id, GROUP_CONCAT(type) AS cloth, GROUP_CONCAT(g.id) AS clothId, GROUP_CONCAT(price) AS prc, GROUP_CONCAT(g.photo, ' ') AS img
  FROM orders AS o
  LEFT JOIN garment  AS g
  ON o.id = g.order_id
  LEFT JOIN users AS u
  ON o.user_id = u.id
  GROUP BY o.id
  `;
    requests = [req.query['color-id']];
  } else {
    sql = `
    SELECT
    o.id AS orderId, size, userCom, cloth_ids, orderSum, user_id, status, date, u.name AS user_name, u.email AS mail, g.id, GROUP_CONCAT(type) AS cloth, GROUP_CONCAT(g.id) AS clothId, GROUP_CONCAT(price) AS prc, GROUP_CONCAT(g.photo, ' ') AS img
  FROM orders AS o
  LEFT JOIN garment  AS g
  ON o.id = g.order_id
  LEFT JOIN users AS u
  ON o.user_id = u.id
  GROUP BY o.id
    `;
    requests = ['%' + req.query['s'] + '%'];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ Users FRONT
app.get('/users', (req, res) => {
  const sql = `
  SELECT
  id, name, email, role
  FROM users
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE Orders FRONT
app.post('/uzsakymai', (req, res) => {
  const sql = `
  INSERT INTO orders
  (size, userCom, cloth_ids, orderSum, user_id)
  VALUES (?, ?, ?, ?, ?)
  `;
  con.query(sql, [req.body.size, req.body.userCom, req.body.joinIds, req.body.orderSum, req.body.userId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Uzsakymas pateiktas. Laukite patvirtinimo.', type: 'success' } });
  })
});

// CREATE Garment BACK
app.post('/rubai', (req, res) => {
  const sql = `
  INSERT INTO garment
  (type, price, photo, color_id)
  VALUES (?, ?, ?, ?)
  `;
  con.query(sql, [req.body.type, req.body.price, req.body.photo, req.body.color], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Naujas drabuzis sekmingai sukurtas', type: 'success' } });
  })
});

// CREATE Colors BACK
app.post('/spalvos', (req, res) => {
  const sql = `
  INSERT INTO colors
  (title, hex_code)
  VALUES (?, ?)
  `;
  con.query(sql, [req.body.title, req.body.hexCode], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Sukurta nauja spalva', type: 'success' } });
  })
});


// DELETE Garment BACK
app.delete('/rubai/:id', (req, res) => {
  const sql = `
  DELETE FROM garment
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Drabuzis istrintas is saraso', type: 'danger' } });
  })
});

// DELETE Colors BACK
app.delete('/spalvos/:id', (req, res) => {
  const sql = `
  DELETE FROM colors
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Drabuzis istrintas is saraso', type: 'danger' } });
  })
});

// DELETE orders BACK
app.delete('/uzsakymai/:id', (req, res) => {
  const sql = `
  DELETE FROM orders
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Uzsakymas istrintas is saraso', type: 'danger' } });
  })
});

// DELETE Photo BACK
app.delete('/nuotrauka/:id', (req, res) => {
  const sql = `
  UPDATE garment
  SET photo = null
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Nuotrauka sekimingai istrinta', type: 'info' } });
  })
});

// EDIT BACK
app.put('/rubai/:id', (req, res) => {
  const sql = `
  UPDATE garment 
  SET type = ?, price = ?, photo = ?, color_id = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.type, req.body.price, req.body.photo, req.body.color, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Drabuzio duomenys sekmingai atnaujinti', type: 'info' } });
  });
});

// EDIT Orders Status BACK
app.put('/uzsakymai/:id', (req, res) => {
  const sql = `
  UPDATE orders 
  SET status = 1
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Uzsakymas patvirtintas', type: 'info' } });
  });
});

// EDIT Garment inCart FRONT
app.put('/krepselis/:id', (req, res) => {
  const sql = `
  UPDATE garment 
  SET inCart = ?
  where id = ?
  `;
  con.query(sql, [req.body.inCart, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Drabuzis sekmingai idetas i krepseli.', type: 'info' } });
  });
});

// EDIT Garment offCart FRONT
app.put('/krepselisOff/:id', (req, res) => {
  const sql = `
  UPDATE garment 
  SET inCart = ?
  where id = ?
  `;
  con.query(sql, [req.body.offCart, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jusu uzsakymas sekmingai pateiktas. Laukite patvirtinimo.', type: 'info' } });
  });
});

// EDIT Garment order Assign BACK
app.put('/orderAssign/:id', (req, res) => {
  console.log(req.body)
  const sql = `
  UPDATE garment 
  SET order_id = ?
  where id = ?
  `;
  con.query(sql, [req.body.orderId, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Drabuzis sekmingai idetas i krepseli.', type: 'info' } });
  });
});

// CREATE Comments FRONT
app.post('/komentarai', (req, res) => {
  const sql = `
  INSERT INTO comments
  (com, cloth_id)
  VALUES (?, ?)
  `;
  con.query(sql, [req.body.comment, req.body.clothId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jusu komentaras issiustas!', type: 'success' } });
  })
});

// READ Comments BACK
app.get('/komentarai', (req, res) => {
  const sql = `
  SELECT
 GROUP_CONCAT(cm.id) AS coms_id, GROUP_CONCAT(com, '-^-^-') AS coms, COUNT(com) AS com_count, cloth_id, type, price, photo
  FROM comments AS cm
  LEFT JOIN garment AS g
  ON cm.cloth_id = g.id
  GROUP BY g.id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// DELETE comments BACK
app.delete('/komentarai/:id', (req, res) => {
  const sql = `
  DELETE FROM comments
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Komentaras istrintas is saraso', type: 'danger' } });
  })
});

// EDIT reitings FRONT
app.put('/reitingai/:id', (req, res) => {
  const sql = `
  UPDATE garment 
  SET rates = rates + 1, rate_sum = rate_sum + ?
      where id = ?
        `;
  con.query(sql, [req.body.rate, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jusu balsas sekmingai iskaitytas. Aciu uz ivertinima!', type: 'info' } });
  });
});


app.listen(port, () => {
  console.log(`Peleda klauso porto ${port}`)
})