const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "daycare",
});

app.post("/createactivity", (req, res) => {
  const ActivityName = req.body.ActivityName;
  const ActivityDescription = req.body.ActivityDescription;
  const Duration = req.body.Duration;

  db.query(
    "INSERT INTO dailyactivities (activity_name, activity_description, duration_hours) VALUES (?,?,?)",
    [ActivityName, ActivityDescription, Duration],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.get("/activities", (req, res) => {
  db.query("SELECT * FROM dailyactivities", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteactivity/:activity_id", (req, res) => {
  const activity_id = req.params.activity_id;
  db.query(
    "DELETE FROM dailyactivities WHERE activity_id  = ?",
    activity_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/createteacher", (req, res) => {
  const TeacherName = req.body.TeacherName;
  const Qualification = req.body.Qualification;
  const Subject = req.body.Subject;
  const AgeGroup = req.body.AgeGroup;

  db.query(
    "INSERT INTO teachers (teacher_name, qualifications, subject, age_group) VALUES (?,?,?,?)",
    [TeacherName, Qualification, Subject, AgeGroup],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.get("/teachers", (req, res) => {
  db.query("SELECT * FROM teachers", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/userteachers/:email", (req, res) => {
  const email = req.params.email;

  db.query(
    "SELECT T.teacher_name, T.qualifications , T.subject FROM teachers AS T, children AS C where C.email = ? AND yeartoage(C.year) = T.age_group",
    email,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.delete("/deleteteacher/:teacher_id", (req, res) => {
  const teacher_id = req.params.teacher_id;
  db.query(
    "DELETE FROM teachers WHERE teacher_id  = ?",
    teacher_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/createdoctor", (req, res) => {
  const DoctorName = req.body.DoctorName;
  const Qualification = req.body.Qualification;
  const Specialization = req.body.Specialization;

  db.query(
    "INSERT INTO doctors (doctor_name, doctor_qualifications, specialization) VALUES (?,?,?)",
    [DoctorName, Qualification, Specialization],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.get("/doctors", (req, res) => {
  db.query("SELECT * FROM doctors", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deletedoctor/:doctor_id", (req, res) => {
  const doctor_id = req.params.doctor_id;
  db.query(
    "DELETE FROM doctors WHERE doctor_id  = ?",
    doctor_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/createcaregiver", (req, res) => {
  const CaregiverName = req.body.CaregiverName;
  const ShiftStart = req.body.ShiftStart;
  const ShiftEnd = req.body.ShiftEnd;
  const Room = req.body.Room;

  db.query(
    "INSERT INTO caregivers (caregiver_name, shift_start, shift_end, Room) VALUES (?,?,?,?)",
    [CaregiverName, ShiftStart, ShiftEnd, Room],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.get("/caregivers", (req, res) => {
  db.query("SELECT * FROM caregivers", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deletecaregiver/:caregiver_id", (req, res) => {
  const caregiver_id = req.params.caregiver_id;
  db.query(
    "DELETE FROM caregivers WHERE caregiver_id  = ?",
    caregiver_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/createuser", (req, res) => {
  const ChildName = req.body.ChildName;
  const ParentName = req.body.ParentName;
  const MedicalHistory = req.body.MedicalHistory;
  const Year = req.body.Year;
  const Email = req.body.Email;
  const Password = req.body.Password;
  const Contact = req.body.Contact;

  db.query(
    "INSERT INTO children (child_name, parent_name, medical_history, year, email, password, contact) VALUES (?,?,?,?,?,?,?)",
    [ChildName, ParentName, MedicalHistory, Year, Email, Password, Contact],
    (err, result) => {
      if (err) {
        return res.status(400).send({
          message: "Inavlid Inputs",
        });
      } else {
        console.log(result);
      }
    }
  );
});

app.get("/children", (req, res) => {
  db.query("SELECT * FROM children", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/profile/:email", (req, res) => {
  const email = req.params.email;
  db.query("SELECT * FROM children WHERE email = ? ", email, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deletechild/:email", (req, res) => {
  const email = req.params.email;
  db.query("DELETE FROM children WHERE child_id  = ?", email, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// create an api for login
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT login(?,?) as value", [email, password], (err, result) => {
    if (err) {
      res.send({ message: "Wrong email/password combination!" });
      console.log(err);
    } else {
      // console.log(result[0].value);
      res.send(result[0]);
    }
  });
});

app.listen(3001);
