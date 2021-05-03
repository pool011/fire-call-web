import express from 'express';
import sequelize from 'sequelize';
import db from '../database/initDB.js';
const Op = sequelize.Op;
const router = express.Router();


function getReply(results) {
  try {
    return results.length > 0 ? {data: results} : {message: 'No results found.'};
  } catch (err) {
    console.log(err);
    return {message: 'Server error!'};
  }
  
}
// New route template

router.route('/newRoute')
  .get(async (req, res) => {
    res.send('Action not available');
  })
  .post(async (req, res) => {
    res.send('Action not available.');
  })
  .put(async (req, res) => {
    res.send('Action not available.');
  })
  .delete(async (req, res) => {
    res.send('Action unavailable.');
  });



// INCIDENTS
router.route('/incidents')
  .get(async (req, res) => {
    try {
      const all_incidents = await db.incidents.findAll();
      const reply = getReply(all_incidents);
      res.json(reply);
    } catch (err) {
      console.error(err);
      res.error('Server Error!');
    }
  })
  .post(async (req, res) => {
    try {
      const newIncident = await db.incidents.create({
        incident_id:  req.body.incident_id,
        date: req.body.date,
        description: req.body.description,
        postal_code: req.body.postal_code,
        district_code: req.body.district_code,
        call_id: req.body.call_id,
        dispatch_id: req.body.dispatch_id
      });
      res.json(newIncident);
    } catch (err) {
      console.error(err);
      res.send('Server Error!');
    }
  })
  .put(async (req, res) => {
    res.send('Action not available.');
  })
  .delete(async (req, res) => {
    res.send('Action unavailable.');
  });

router.route('/incidents/:incident_id')
  .get(async (req, res) => {
    try {
      const incident = await db.incidents.findAll({
        where: {
          incident_id: req.params.incident_id
        }
      });
      const reply = getReply(incident);
      res.json(reply);
    } catch (err) {
      console.error(err);
      res.error('Server Error!');
    }
  })
  .post(async (req, res) => {
    res.send('Action not available.');
  })
  .put(async (req, res) => {
    try {
      await db.incidents.update({
        date: req.body.date,
        description: req.body.description,
        postal_code: req.body.postal_code,
        district_code: req.body.district
      },
      {
        where: {
          incident_id: req.params.incident_id
        }
      });
      res.send('Successful update.');
    } catch (err) {
      console.error(err);
      res.error('Server Error!');
    }
  })
  .delete(async (req, res) => {
    try {
      console.log(req.params)
      await db.incidents.destroy({
        where: {
          incident_id: req.params.incident_id
        }
      });
      res.send('Successful deletion.');
    } catch (err) {
      console.error(err);
      res.error('Server Error!');
    }
  });

// Gets the unit from an incident
router.get('/incidents/:incident_id/units', async (req, res) => {
  try {
    const getUnit = await db.incidents.findAll({
      where: {
        incident_id: req.params.incident_id
      }
    });    
    console.log(getUnit);
    
    const allUnits = await db.units.findAll({
      where: {
        unit_id: getUnit[0].dataValues.unit_id
      }
    });

    const reply = getReply(allUnits);
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

//Get calls from an incident
router.get('/incidents/:incident_id/calls', async (req, res) => {
  try {
    const getIncidents = await db.incidents.findAll({
      where: {
        incident_id: req.params.incident_id
      }
    });    
    
    const allCalls = await db.calls.findAll({
      where: {
        call_id: getIncidents[0].dataValues.call_id
      }
    });

    const reply = getReply(allCalls);
    res.json(reply);
  }
   catch (err) {
     console.error(err);
     res.send(error);
   }
});

router.get('/incidents/:incident_id/dispatch', async (req, res) => {
  try { 
    const getIncidents = await db.incidents.findAll({
      where: {
        incident_id: req.params.incident_id
      }
    });    
    const getDispatch = await db.dispatch.findAll({
      where: {
        dispatch_id: getIncidents[0].dataValues.dispatch_id
      }
    });
    const reply = getReply(getDispatch);
    res.json(reply);
  }
  catch (err) {
    console.error(err);
    res.send(error);
  }
});

router.get('/incidents/:incident_id/locations', async (req, res) => {
  try { 
    const getIncidents = await db.incidents.findAll({
      where: {
        incident_id: req.params.incident_id
      
      } 
    });    
    const getLocations = await db.locations.findAll({
      where: {
        incidents_incident_id: getIncidents[0].dataValues.incident_id
      }
    });
    const reply = getReply(getLocations);
    res.json(reply);
  }
  catch (err) {
    console.error(err);
    res.send(error);
  }
});

// router.get('/incidents/:incident_id/incident', async (req, res) => {
//   try { 
//     const getIncidents = await db.incidents.findAll({
//       where: {
//         incident_id: req.params.incident_id
//       }
//     });    
//     const reply = getReply(getIncidents);
//     res.json(reply);
//   }
//   catch (err) {
//     console.error(err);
//     res.send(error);
//   }
// });

 

// STATIONS
router.route('/stations')
  .get(async (req, res) => {
    try {
      const stations = await db.stations.findAll();
      const reply = getReply(stations);
      res.json(reply);
    } catch (err) {
      console.error(err);
      res.send('Server Error!');
    }
  })
  .post(async (req, res) => {
    res.send('Action not available.');
  })
  .put(async (req, res) => {
    res.send('Action not available.');
  })
  .delete(async (req, res) => {
    res.send('Action unavailable.');
  });
  
// JURISDICTION
router.route('/jurisdiction')
  .get(async (req, res) => {
    try {
      const jurisdiction = await db.jurisdiction.findAll();
      const reply = getReply(jurisdiction);
      res.json(reply)
    } catch (err) {
      console.error(err);
      res.send('Server Error!');
    }
  })
  .post(async (req, res) => {
    res.send('Action not available.');
  })
  .put(async (req, res) => {
    res.send('Action not available.');
  })
  .delete(async (req, res) => {
    res.send('Action not available.');
  });



// LOCATION
router.route('locations')
  .get(async (req, res) => {
    try {
      const locations = await db.locations.findAll();
      const reply = getReply(locations);
      res.json(reply);
    } catch (err) {
      console.error(err);
      res.error('Server Error!')
    }
  })
  .post(async (req, res) => {
    res.send('Action not available.');
  })
  .put(async (req, res) => {
    res.send('Action not available.');
  })
  .delete(async (req, res) => {
    res.send('Action unavailable.');
  });
  

// CALLS
router.route('/calls')
  .get(async (req, res) => {
    try {
      const calls = await db.calls.findAll();
      const reply = getReply(calls);
      res.json(reply);
    } catch (err) {
      console.error(err);
      res.error('Server Error!')
    }
  })
  .post(async (req, res) => {
    res.send('Action not available.');
  })
  .put(async (req, res) => {
    res.send('Action not available.');
  })
  .delete(async (req, res) => {
    res.send('Action unavailable.');
  });

router.post('/calls/:call_id', async(req, res) => {
  try {
    const call = await db.calls.create({
    });
  } catch (err) {
    console.error(err);
    res.error('Server Error!');
  }
});


// Custom query
router.route('/custom')
  .get(async (req, res) => {
    try {
      const custom = await db.sequelizeDB.query(req.body.query, {
        type: sequelize.QueryTypes.SELECT
      });
      req.json(custom);
    } catch (err) {
      console.log(err);
      res.send('Server Error!')
    }
  })
  .post(async (req, res) => {
    res.send('Action not available.');
  })
  .put(async (req, res) => {
    res.send('Action not available.');
  })
  .delete(async (req, res) => {
    res.send('Action unavailable.');
  });

// EMPLOYEES
router.route('/employees')
  .get(async (req, res) => {
    try {
      const employees = await db.employees.findAll();
      const reply = getReply(employees);
      res.json(reply);
    } catch (err) {
      console.error(err);
      res.send('Server Error!');
    }
  })
  .post(async (req, res) => {
    res.send('Action not available.');
  })
  .put(async (req, res) => {
    res.send('Action not available.');
  })
  .delete(async (req, res) => {
    res.send('Action unavailable.');
  });

router.route('/dispatch')
  .get(async (req, res) => {
    try {
      const dispatch = await db.dispatch.findAll();
      const reply = getReply(dispatch);
      res.json(reply);
    } catch (err) {
      console.error(err);
      res.send('Server Error!');
    }
  })
  .post(async (req, res) => {
    res.send('Action not available.');
  })
  .put(async (req, res) => {
    res.send('Action not available.');
  })
  .delete(async (req, res) => {
    res.send('Action unavailable.');
  });


router.route('/search')
.get(async (req, res) => {
  try {
    // console.log(req)
    let replyData = []
    const matchCalls = await db.calls.findAll({
      where: {
        [Op.or]: [
          {
            call_type: {
              [Op.startsWith]: req.query.queryText
            } 
          },
          {
            call_class: {
              [Op.startsWith]: req.query.queryText
            }
          }
        ]
      }
    });
    let callsToIncidents;
    if (matchCalls !== 'undefined') {
      const call_ids = matchCalls.map((call) => {
        // console.log(call.dataValues.call_id);
        return call.dataValues.call_id;
      });
      callsToIncidents = await db.incidents.findAll({
        where: {
          call_id: {
            [Op.in]: call_ids
          }
        }
      })
    }
    
    console.log(`${req.query.endDate} 23:59:59`)
    const startDate = Date.parse(`${req.query.startDate}T00:00:00-00:00`);
    const endDate = Date.parse(`${req.query.endDate}T23:59:59-00:00`);

    const matchIncidents = await db.incidents.findAll({
      where: {
        [Op.and]: [{
          [Op.or]: [
            { description: {
              [Op.startsWith]: req.query.queryText
            } },
            { postal_code: {
              [Op.startsWith]: req.query.queryText
            } },
          ]},
          {
            date: {
              [Op.between]: [startDate, endDate]
            }
          }
      ]}
    });
    console.log(matchIncidents);
    const incidentData = matchIncidents + callsToIncidents;
    // console.log(incidentData);
    replyData += [{'incidents': incidentData}];
    // console.log(replyData);
    const reply = getReply(replyData);
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.send('Server Error!');
  }
})
.post(async (req, res) => {
  res.send('Action not available.');
})
.put(async (req, res) => {
  res.send('Action not available.');
})
.delete(async (req, res) => {
  res.send('Action unavailable.');
});


export default router;