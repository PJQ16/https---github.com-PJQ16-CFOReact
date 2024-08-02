import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Content from '../components/Content';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../config';
import { UserContext } from '../components/MyContext';
import ForestIcon from '@mui/icons-material/Forest';
import SearchIcon from '@mui/icons-material/Search';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Activitydata() {
    const { userData } = useContext(UserContext);
    const [dataPeriods, setDataPeriods] = useState([]);
    const [searchYear, setSearchYear] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        fetchDataPeriod();
    }, []);

    const fetchDataPeriod = async () => {
        try {
            const res = await axios.get(config.urlApi + `/activity/showPeriod/${userData.facultyID}`);
            setDataPeriods(res.data);
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: e.message
            });
        }
    };

    const handleSearchChange = (selectedOption) => {
        setSearchYear(selectedOption ? selectedOption.value : '');
    };

    const handleClickPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredData = dataPeriods.filter(item => {
        if (!searchYear) return true;
        return item.years + 543 === parseInt(searchYear);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // สร้างตัวเลือกสำหรับปีจาก dataPeriods
    const yearOptions = dataPeriods.map(item => ({
        value: item.years + 543,
        label: item.years + 543
    }));

    return (
        <div>
            <Navbar />
            <Layout>
                <Sidebar />
                <Content>
                    <p>
                        <SearchIcon style={{ color: '#ffffff' }} />
                        <Select
                            options={yearOptions}
                            onChange={handleSearchChange}
                            isClearable
                            placeholder={`ค้นหาปี..`}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderRadius: '20px',
                                    border: '5px solid #cfc2',
                                    paddingLeft: '20px',
                                    marginTop: '2px',
                                    color: 'black',
                                    width:'200px'
                                })
                            }}
                        />
                    </p>
                    <div className="row">
                        {currentItems.map((item) =>
                            <div className="col-md-4 col-sm-12 mt-2" key={item.id}>
                                <div className="card" style={{ width: '18rem' }}>
                                    {item.logo === '' ?
                                        <img src='https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0=' className="card-img-top" alt="..." />
                                        :
                                        <img src={`${config.urlApi}/logos/${userData.logo}`} className="card-img-top" alt="..." />
                                    }
                                    <div className="card-body">
                                        <h5 className="card-title">ปล่อยก๊าซเรือนกระจก {item.years + 543}</h5>
                                        <p className="card-text">กิจกรรมการปล่อยก๊าซเรือนกระจก ของวิทยาเขต {userData.campusName} หน่วยงาน {userData.facultyName}</p>
                                        <Link to={`/activityDetail/${item.campus_id}/${item.fac_id}/${item.years + 543}/${item.id}`} className="btn text-white" style={{ backgroundColor: '#043C7F' }}>
                                            <ForestIcon style={{ color: 'white' }} /> กิจกรรม
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <nav>
                        <ul className="pagination justify-content-center">
                            {[...Array(totalPages)].map((_, i) => (
                                <li key={i + 1} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handleClickPage(i + 1)}>{i + 1}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </Content>
            </Layout>
            <Footer />
        </div>
    );
}
