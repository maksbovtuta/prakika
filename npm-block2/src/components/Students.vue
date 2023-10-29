<template>
    
    <h1>Student Management</h1>
    <input placeholder="Search by name" v-model="searchName" />
    <table>
        <tr  v-for="(student, index)  in filteredStudents"  :key="index">
            <td :class="{ 'highlighted': student.highlighted }">{{ student.name }}</td>
            <td>
                <input type="checkbox" v-model="student.workDone" />
            </td>
            <td>
                <router-link v-bind:to="'/student-info/' + student._id">
                    {{ student.name }}
                </router-link> 
            </td>
            <td>
            <a @click="modalStudent(student)">
                <img
                @click="isOpen = true"
                v-if="student.photo"
                :src="student.photo"
                alt="photo"
                width="50"
                />
                </a>
            </td>
            <td>{{ student.group }}</td>
            <td>{{ student.grade }}</td>
            <td>
                <a href="#" @click="deleteStudent(student._id)" 
                    v-show="student.group === getCurrentUser.group"
                    >Видалити
                </a>
            </td>
        </tr>
    </table>

    <div class="addStudent">
        <input placeholder="Name" v-model="newStudent.name" />
        <input v-model="newStudent.workDone" type="checkbox" />
        <select v-model="newStudent.group" id="groupSelect" name="group">
            <option value="" disabled selected>Select Group</option>
            <option value="Group A">RPZ 20 1/9</option>
            <option value="Group B">RPZ 20 2/9</option>
        </select>
        <input v-model="newStudent.grade" type="number" placeholder="Grade" />
        <button @click="addStudent">Add Student</button>
    </div>
    <h3 v-for="student in students">{{ student.name }}</h3>
    <!-- -->
</template>

<script>
    import axios from 'axios'
    // import Modal from "./Modal.vue";
    

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





export default{
    // components: {
    //     Modal
    // },
    data() {
        return {
            newStudent: {
                id: "",
                name: "",
                group: "",
                grade: "",
                workDone: false,
            },
            students: studentData,
            searchName: "",
            deleteLink: "",
        }
    },
    computed: {
        getCurrentUser() {
           return this.$store.getters.getUser
            },

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
    mounted: function() {
        axios.get("http://34.82.81.113:3000/students")
        .then((response) => {
            this.students = response.data
        })
    },
    methods: {
        deleteStudent(id) {
            axios.delete("http://34.82.81.113:3000/students/" + id)
            .then(data => {
                const index = this.students.findIndex((student) => student._id == id);
                    if (index !== -1) {
                        this.students.splice(index, 1);
                }
            })

            
        },
        selectStudent(student) {
        this.selectedStudent = { ...student }; //new copy of selected student
        },
        modalStudent(student) {
        this.modalStudentInfo = { ...student }; //new copy of selected student
        },
        addStudent() {
            axios.post("http://34.82.81.113:3000/students", this.newStudent)
           .then(response => {
               console.log(response.data);
                this.students.push(response.data);
           })

            

            this.newStudent.name = "";
            this.newStudent.workDone = false;
            this.newStudent.group = "";
            this.newStudent.grade = "";
        },
    },

}


</script>