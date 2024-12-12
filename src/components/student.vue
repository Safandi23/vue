<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Pendidikan</title>
    <style>
        /* Basic Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: #f4f4f9;
            color: #333;
        }

        /* Header */
        header {
            background-color: #4CAF50;
            color: white;
            padding: 15px 0;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 90%;
            max-width: 1200px;
            margin: auto;
        }

        header h1 {
            font-size: 24px;
        }

        header nav ul {
            list-style: none;
            display: flex;
        }

        header nav ul li {
            margin: 0 10px;
        }

        header nav ul li a {
            color: white;
            text-decoration: none;
            font-weight: bold;
            cursor: pointer;
        }

        /* Landing Section */
        #landing-section {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            height: 70vh;
        }

        #landing-section h2 {
            font-size: 32px;
            color: #333;
            margin-bottom: 20px;
        }

        #landing-section p {
            font-size: 18px;
            color: #555;
            max-width: 600px;
            margin-bottom: 30px;
        }

        #start-btn {
            padding: 12px 25px;
            font-size: 18px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
        }

        #start-btn:hover {
            background-color: #45a049;
        }

        /* Main Content */
        main {
            flex: 1;
            padding: 20px 0;
        }

        .container {
            width: 90%;
            max-width: 1200px;
            margin: auto;
        }

        #siswa, #siswa-form-section {
            display: none; /* Hidden initially */
        }

        h2 {
            color: #4CAF50;
            margin-bottom: 10px;
        }

        .siswa-list .siswa-item {
            background: #ffffff;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .siswa-item p {
            margin-bottom: 10px;
            color: #333;
        }

        .btn {
            padding: 8px 12px;
            margin-right: 5px;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .delete-btn {
            background-color: #e74c3c;
        }

        .edit-btn {
            background-color: #3498db;
        }

        /* Form Styling */
        .siswa-form input[type="text"],
        .siswa-form input[type="number"] {
            width: calc(100% - 22px);
            padding: 10px;
            margin: 5px 0;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        .siswa-form button {
            padding: 10px;
            width: 100%;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }

        .siswa-form button:hover {
            background-color: #45a049;
        }

        /* Footer */
        footer {
            background-color: #333;
            color: white;
            padding: 15px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <h1>Website Pendidikan</h1>
            <nav>
                <ul>
                    <li><a onclick="showLandingSection()">Home</a></li>
                    <li><a onclick="showSiswaSection()">Data Siswa</a></li>
                    <li><a href="{{ url('/pelajaran') }}">Pelajaran</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Landing Section -->
    <section id="landing-section">
        <h2>Selamat Datang di Website Pendidikan</h2>
        <p>Website ini menyediakan informasi tentang data siswa dan pelajaran siswa dan memungkinkan Anda untuk menambah, mengedit, serta menghapus data siswa dan pelajaran siswa.</p>
        <button id="start-btn" onclick="showSiswaSection()">Mulai</button>
    </section>

    <!-- Main Content -->
    <main>
        <div class="container">
            <section id="siswa">
                <h2>Data Siswa</h2>
                <div id="siswa-list" class="siswa-list"></div>
            </section>

            <section id="siswa-form-section">
                <h2 id="form-title">Tambah Siswa</h2>
                <form id="siswa-form" class="siswa-form">
                    <input type="text" id="nama" placeholder="Nama" required><br>
                    <input type="text" id="kelas" placeholder="Kelas" required><br>
                    <input type="text" id="alamat" placeholder="Alamat" required><br>
                    <input type="number" id="umur" placeholder="Umur" required><br>
                    <input type="hidden" id="siswa-id"> <!-- Hidden field for the student's ID -->
                    <button type="submit" id="submit-btn">Tambah</button>
                </form>
            </section>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <div class="container">
            <p>&copy; 2024 Website Pendidikan | Dibuat sama orang tulus</p>
        </div>
    </footer>

    <script>
        // Show "Data Siswa" section and hide landing page
        function showSiswaSection() {
            document.getElementById('landing-section').style.display = 'none';
            document.getElementById('siswa').style.display = 'block';
            document.getElementById('siswa-form-section').style.display = 'block';
            fetchSiswa(); // Load data siswa when entering the section
        }

        // Show landing section and hide "Data Siswa" section
        function showLandingSection() {
            document.getElementById('landing-section').style.display = 'flex';
            document.getElementById('siswa').style.display = 'none';
            document.getElementById('siswa-form-section').style.display = 'none';
        }

        // Fetch Siswa Data from Laravel API
        async function fetchSiswa() {
            const response = await fetch('http://localhost:8000/api/siswa');
            const data = await response.json();
            const siswaList = document.getElementById('siswa-list');
            siswaList.innerHTML = '';
            data.forEach(siswa => {
                siswaList.innerHTML += `
                    <div class="siswa-item">
                        <p><strong>${siswa.nama}</strong> - ${siswa.kelas} - ${siswa.alamat} - ${siswa.umur} tahun</p>
                        <button onclick="editSiswa(${siswa.id}, '${siswa.nama}', '${siswa.kelas}', '${siswa.alamat}', ${siswa.umur})" class="btn edit-btn">Edit</button>
                        <button onclick="deleteSiswa(${siswa.id})" class="btn delete-btn">Hapus</button>
                    </div>
                `;
            });
        }

        // Save or Update Siswa
        async function saveSiswa() {
            const id = document.getElementById('siswa-id').value;
            const nama = document.getElementById('nama').value;
            const kelas = document.getElementById('kelas').value;
            const alamat = document.getElementById('alamat').value;
            const umur = document.getElementById('umur').value;

            const endpoint = id ? `siswa/${id}` : 'siswa';
            const method = id ? 'PUT' : 'POST';

            await fetch(`http://localhost:8000/api/${endpoint}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nama, kelas, alamat, umur })
            });

            fetchSiswa();
            alert(id ? "Data siswa berhasil diperbarui!" : "Data siswa berhasil ditambahkan!");
            clearForm();
        }

        // Edit Siswa Data
        function editSiswa(id, nama, kelas, alamat, umur) {
            document.getElementById('siswa-id').value = id;
            document.getElementById('nama').value = nama;
            document.getElementById('kelas').value = kelas;
            document.getElementById('alamat').value = alamat;
            document.getElementById('umur').value = umur;
            document.getElementById('form-title').textContent = "Edit Siswa";
            document.getElementById('submit-btn').textContent = "Update";
        }

        // Delete Siswa Data
        async function deleteSiswa(id) {
            await fetch(`http://localhost:8000/api/siswa/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            fetchSiswa();
            alert("Data siswa berhasil dihapus!");
        }

        // Clear Form Fields
        function clearForm() {
            document.getElementById('siswa-id').value = '';
            document.getElementById('nama').value = '';
            document.getElementById('kelas').value = '';
            document.getElementById('alamat').value = '';
            document.getElementById('umur').value = '';
            document.getElementById('form-title').textContent = "Tambah Siswa";
            document.getElementById('submit-btn').textContent = "Tambah";
        }

        // On Page Load, Fetch Siswa Data
        window.onload = fetchSiswa;

        document.getElementById('siswa-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            saveSiswa();
        });
    </script>
</body>
</html>
