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
    editable: true,
  },
  {
    field: 'cadre',
    headerName: 'Cadre',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
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
