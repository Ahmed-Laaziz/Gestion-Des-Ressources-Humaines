import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'; // Import Axios

const columns = [
  {
    field: 'prenom',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'nom',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: 'cadre',
    headerName: 'Cadre',
    // description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 100,
  },
  {
    field: 'num_loyer',
    headerName: 'Numéro de loyer',
    type: 'number',
    width: 160,
    editable: false,
  },
  {
    field: 'num_ref',
    headerName: 'Numéro de preuve',
    type: 'number',
    width: 160,
    editable: false,

  },
  {
    field: 'date_visa',
    headerName: 'Date du visa',
    type: 'Date',
    width: 160,
    editable: false,
  },
  {
    field: 'date_effective',
    headerName: 'Date effective',
    type: 'Date',
    width: 160,
    editable: false,
  },
];

export default function DataGridDemo() {
  const [professeurs, setProfesseurs] = useState([]); // State to store the fetched data

  useEffect(() => {
    // Fetch the title from the backend API
    const fetchProfessor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/professeurs` // Replace with your actual API endpoint
        );
        setProfesseurs(response.data);
      } catch (error) {
        console.error('Error fetching title:', error);
      }
    };

    fetchProfessor(); // Call the fetchTitle function when the component mounts
  }, ); // Include articleId in the dependency array to fetch when it changes

// Define a function to generate unique IDs for rows

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={professeurs} // Use the fetched data for rows
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
