
import { createApp } from 'vue'


var studentData = [
  {
    id: 0,
    name: "John Doe",
    group: "Group A",
    grade: 85,
    workDone: true,
  },
  {
    id: 1,
    name: "Jane Smith",
    group: "Group B",
    grade: 92,
    workDone: false,
  },
  {
    id: 2,
    name: "Bob Johnson",
    group: "Group A",
    grade: 78,
    workDone: false,
  },
];

const newStudent = {
    id: "",
    name: "",
    group: "",
    grade: "",
    workDone: false,
};

createApp({
    
    data() {
        return {
            students: studentData,
            searchName: "",
            deleteLink: "",
        }
    },
    computed: {
        filteredStudents: function () {
            const searchNameLower = this.searchName.toLowerCase();
            return this.students.map((student) => ({
                ...student,
                highlighted:
                    student.name.toLowerCase().includes(searchNameLower) &&
                    searchNameLower.length > 0,
            }));
        },
    },
    methods: {
        deleteStudent(id) {
            const index = this.students.findIndex((student) => student.id === id);
            if (index !== -1) {
                this.students.splice(index, 1);
            }
        },
        addStudent() {
            newStudent.id = this.students.length + 1;
            this.students.push({ ...newStudent });

            newStudent.name = "";
            newStudent.workDone = false;
            newStudent.group = "";
            newStudent.grade = "";
        },
    },

}).mount('#app')

