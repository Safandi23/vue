<template>
    <div>
      <header>
        <h1>Website Pendidikan - Pelajaran</h1>
      </header>
  
      <main>
        <h2>Daftar Pelajaran</h2>
        <div id="pelajaran-list" class="pelajaran-list">
          <div
            v-for="pelajaran in pelajaranList"
            :key="pelajaran.id"
            class="pelajaran-item"
          >
            <p><strong>{{ pelajaran.nama }}</strong></p>
            <p>{{ pelajaran.deskripsi }}</p>
            <p>{{ pelajaran.jam }} Jam</p>
            <button @click="editPelajaran(pelajaran)" class="btn edit-btn">
              Edit
            </button>
            <button @click="deletePelajaran(pelajaran.id)" class="btn delete-btn">
              Hapus
            </button>
          </div>
        </div>
  
        <h2>{{ formTitle }}</h2>
        <form @submit.prevent="savePelajaran">
          <input v-model="form.nama" type="text" placeholder="Nama Pelajaran" required />
          <textarea v-model="form.deskripsi" placeholder="Deskripsi Pelajaran" required></textarea>
          <input v-model.number="form.jam" type="number" placeholder="Jam Pelajaran" required />
          <button type="submit">{{ formButtonText }}</button>
        </form>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pelajaranList: [],
        form: {
          id: null,
          nama: "",
          deskripsi: "",
          jam: null,
        },
        formTitle: "Tambah Pelajaran",
      };
    },
    computed: {
      formButtonText() {
        return this.form.id ? "Update" : "Tambah";
      },
    },
    methods: {
      async fetchPelajaran() {
        try {
          const response = await fetch("http://localhost:8000/api/pelajaran");
          this.pelajaranList = await response.json();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      },
      async savePelajaran() {
        const { id, nama, deskripsi, jam } = this.form;
        const endpoint = id ? `pelajaran/${id}` : "pelajaran";
        const method = id ? "PUT" : "POST";
        try {
          await fetch(`http://localhost:8000/api/${endpoint}`, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nama, deskripsi, jam }),
          });
          this.fetchPelajaran();
          alert(id ? "Pelajaran diperbarui!" : "Pelajaran ditambahkan!");
          this.clearForm();
        } catch (error) {
          console.error("Error saving data:", error);
        }
      },
      editPelajaran(pelajaran) {
        this.form = { ...pelajaran };
        this.formTitle = "Edit Pelajaran";
      },
      async deletePelajaran(id) {
        try {
          await fetch(`http://localhost:8000/api/pelajaran/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          this.fetchPelajaran();
          alert("Pelajaran dihapus!");
        } catch (error) {
          console.error("Error deleting data:", error);
        }
      },
      clearForm() {
        this.form = {
          id: null,
          nama: "",
          deskripsi: "",
          jam: null,
        };
        this.formTitle = "Tambah Pelajaran";
      },
    },
    mounted() {
      this.fetchPelajaran();
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    margin: 0;
    padding: 0;
  }
  
  header {
    background-color: #4caf50;
    color: white;
    padding: 15px 0;
    text-align: center;
  }
  
  main {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  h1,
  h2 {
    color: #4caf50;
  }
  
  .pelajaran-list .pelajaran-item {
    background: #ffffff;
    margin: 10px 0;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .pelajaran-item p {
    margin: 0;
  }
  
  .pelajaran-item .btn {
    padding: 8px 12px;
    margin-top: 10px;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-btn {
    background-color: #3498db;
  }
  
  .delete-btn {
    background-color: #e74c3c;
  }
  
  form {
    margin-top: 20px;
  }
  
  form input,
  form textarea,
  form button {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  form button {
    background-color: #4caf50;
    color: white;
    cursor: pointer;
  }
  
  form button:hover {
    background-color: #45a049;
  }
  </style>
  