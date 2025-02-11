import { Input, Spin } from 'antd';
import '../Booking.scss';
import { SearchOutlined } from '@mui/icons-material';
import userService from '@/services/userService';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '@/components/Loading/Loading';
import { useMutation } from '@/hooks/useMutation';

const BookingSpecialty = (props) => {
    let [listSpecialty, setListSpecialty] = useState([]);

    let [search, setSearch] = useState('');
    let searchDebounce = useDebounce(search || "", 500);
    const {
        data: dataSpecialty,
        loading: loadingSepcialty,
        execute: fetchSpecialty,
    } = useMutation(() => userService.getSpecialty({ search: searchDebounce }));
    useEffect(() => {
        if (dataSpecialty) {
            setListSpecialty(dataSpecialty?.DT || []);
        }
    }, [dataSpecialty]);
    useEffect(() => {
        fetchSpecialty();
    }, [searchDebounce]);
    let handleChangeSearch = (event) => {
        setSearch(event.target.value);
    }
    return (
        <div>
            <div className="header">
                <FontAwesomeIcon className='icon-back' icon={faLeftLong} onClick={() => { props.back() }} />
                Vui lòng chọn chuyên khoa
            </div>
            <div className='content'>
                <Input
                    onChange={(e) => handleChangeSearch(e)}
                    style={{ height: '40px', borderRadius: '5px', }}
                    placeholder="Tìm nhanh chuyên khoa hoặc triệu chứng"
                    suffix={<SearchOutlined />}
                />
                {loadingSepcialty ?
                    <div className="specialty-list mt-3"><Loading /></div>
                    :
                    <div className="specialty-list mt-3">
                        {listSpecialty?.length > 0 && listSpecialty.map((specialty, index) => (
                            <div key={index} className="specialty-item" onClick={() => props.next(specialty)}>
                                <strong>{specialty.name}</strong>
                                {specialty?.shortDescription && (
                                    <div className="description"><span style={{ color: '#FFA500', fontWeight: 600 }}>Triệu chứng: </span>{specialty.shortDescription}</div>
                                )}
                            </div>
                        ))}
                    </div>
                }

            </div>
        </div>
    );
}
export default BookingSpecialty;