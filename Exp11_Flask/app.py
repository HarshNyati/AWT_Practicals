from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
import os

app = Flask(__name__)

# Default is SQLite so the experiment runs immediately.
# To use PostgreSQL, set USE_POSTGRES=1 and optionally override POSTGRES_URI.
postgres_uri = os.getenv('POSTGRES_URI', 'postgresql://postgres:postgres@localhost:5432/exp11_flask_db')
use_postgres = os.getenv('USE_POSTGRES', '0') == '1'

if use_postgres:
    app.config['SQLALCHEMY_DATABASE_URI'] = postgres_uri
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///exp11_students.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    course = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'course': self.course,
        }


def seed_example_students():
    if Student.query.count() == 0:
        example_students = [
            Student(name='Aman', age=21, course='Computer Science'),
            Student(name='Riya', age=20, course='Information Technology'),
            Student(name='Karan', age=22, course='Electronics'),
        ]
        db.session.add_all(example_students)
        db.session.commit()
        print('Seeded example students for the demo.')


@app.route('/')
def hello_world():
    return 'Hello World from Flask'


@app.route('/students', methods=['GET'])
def get_students():
    try:
        students = Student.query.all()
        return jsonify([student.to_dict() for student in students])
    except SQLAlchemyError as exc:
        return jsonify({'error': f'Database error: {exc.__class__.__name__}'}), 500


@app.route('/students', methods=['POST'])
def add_student():
    data = request.get_json(silent=True) or {}

    name = data.get('name')
    age = data.get('age')
    course = data.get('course')

    if not name or age is None or not course:
        return jsonify({'error': 'name, age, and course are required'}), 400

    try:
        student = Student(name=name, age=age, course=course)
        db.session.add(student)
        db.session.commit()
        return jsonify({'message': 'Student added', 'student': student.to_dict()}), 201
    except SQLAlchemyError as exc:
        db.session.rollback()
        return jsonify({'error': f'Database error: {exc.__class__.__name__}'}), 500


@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    try:
        student = Student.query.get_or_404(student_id)
        data = request.get_json(silent=True) or {}

        if 'name' in data:
            student.name = data['name']
        if 'age' in data:
            student.age = data['age']
        if 'course' in data:
            student.course = data['course']

        db.session.commit()
        return jsonify({'message': 'Student updated', 'student': student.to_dict()})
    except SQLAlchemyError as exc:
        db.session.rollback()
        return jsonify({'error': f'Database error: {exc.__class__.__name__}'}), 500


@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    try:
        student = Student.query.get_or_404(student_id)
        db.session.delete(student)
        db.session.commit()
        return jsonify({'message': 'Student deleted', 'student': student.to_dict()})
    except SQLAlchemyError as exc:
        db.session.rollback()
        return jsonify({'error': f'Database error: {exc.__class__.__name__}'}), 500


if __name__ == '__main__':
    # First-time setup commands:
    # pip install flask flask_sqlalchemy psycopg2
    # python app.py
    with app.app_context():
        try:
            db.create_all()
            seed_example_students()
        except SQLAlchemyError as exc:
            # Keep the app running so '/' works even when PostgreSQL is not yet ready.
            print(f'Database initialization warning: {exc}')

    if use_postgres:
        print('Database mode: PostgreSQL')
    else:
        print('Database mode: SQLite (local fallback)')

    app.run(debug=True, host='127.0.0.1', port=5000)
