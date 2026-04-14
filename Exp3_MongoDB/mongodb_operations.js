const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/school_db';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  course: String,
  email: String,
});

const Student = mongoose.model('Student', studentSchema);

async function runOperations() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully.\n');

    console.log('CREATE: Inserting one student record...');
    const singleStudent = await Student.create({
      name: 'Aman',
      age: 21,
      course: 'Computer Science',
      email: 'aman@example.com',
    });
    console.log('Inserted one student:', singleStudent.toObject(), '\n');

    console.log('CREATE: Inserting multiple student records...');
    const multipleStudents = await Student.insertMany([
      {
        name: 'Riya',
        age: 20,
        course: 'Information Technology',
        email: 'riya@example.com',
      },
      {
        name: 'Karan',
        age: 22,
        course: 'Electronics',
        email: 'karan@example.com',
      },
      {
        name: 'Neha',
        age: 19,
        course: 'Mathematics',
        email: 'neha@example.com',
      },
    ]);
    console.log('Inserted multiple students:');
    multipleStudents.forEach((student) => console.log(student.toObject()));
    console.log();

    console.log('READ: Finding all students...');
    const allStudents = await Student.find();
    console.log('All students:');
    allStudents.forEach((student) => console.log(student.toObject()));
    console.log();

    console.log('READ: Finding one student by name (Riya)...');
    const foundStudent = await Student.findOne({ name: 'Riya' });
    console.log('Student found:', foundStudent ? foundStudent.toObject() : 'No student found');
    console.log();

    console.log('UPDATE: Updating course for student named Karan...');
    const beforeUpdate = await Student.findOne({ name: 'Karan' });
    console.log('Before update:', beforeUpdate ? beforeUpdate.toObject() : 'No student found');

    const updatedStudent = await Student.findOneAndUpdate(
      { name: 'Karan' },
      { course: 'Data Science' },
      { new: true }
    );
    console.log('After update:', updatedStudent ? updatedStudent.toObject() : 'No student updated');
    console.log();

    console.log('DELETE: Deleting one student by name (Neha)...');
    const deletedStudent = await Student.findOneAndDelete({ name: 'Neha' });
    if (deletedStudent) {
      console.log('Deleted student:', deletedStudent.toObject());
    } else {
      console.log('No student found to delete.');
    }
    console.log();

    console.log('Final list of students after CRUD operations:');
    const finalStudents = await Student.find();
    finalStudents.forEach((student) => console.log(student.toObject()));
    console.log();
  } catch (error) {
    console.error('MongoDB operation failed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

runOperations();
