import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Color } from '../../assets/colors';

const MainDatatable = ({ data = [], columns, title = 'Title' }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const deepSearch = (data, searchText) => {
        const searchLower = searchText.toLowerCase();

        const deepSearchObject = (obj) => {
            if (typeof obj === 'object' && obj !== null) {
                return Object.values(obj).some(value => deepSearchObject(value));
            }
            if (Array.isArray(obj)) {
                return obj.some(value => deepSearchObject(value));
            }
            if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
                return obj.toString().toLowerCase().includes(searchLower);
            }
            return false;
        };

        return data && data.filter(item => deepSearchObject(item));
    };

    //* DataTable Styles
    const DataTableCustomStyles = {
        cells: {
            style: {
                textAlign: "center",
                color: Color.datatableFontColor,
                whiteSpace: "nowrap",
                fontFamily: 'Philosopher',
                width: "150px",
                fontSize: "12px"
            },
        },
        rows: {
            style: {
                minHeight: '65px',
                backgroundColor: "#fff",
                fontFamily: 'Philosopher'
            },
        },
        headRow: {
            style: {
                whiteSpace: 'nowrap',
                fontSize: "14px",
                fontWeight: "500",
                color: Color.black,
                fontFamily: 'Philosopher'
            }
        }
    };

    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={DataTableCustomStyles}
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                paginationComponentOptions={{ rowsPerPageText: 'Rows Per Page :' }}
                fixedHeader
            />
        </div>
    );
};

export default MainDatatable;
