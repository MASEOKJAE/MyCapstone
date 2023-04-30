import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import {
    Stack,
  } from '@mui/material';
import { useState, useEffect } from 'react';
// import AttendModal from './Modal/AttendModal';
import './AttendPage.css';
import '../Modal/AttendModal.css';
import ipfsClient, { create } from 'ipfs-http-client';


export default function AttendPage() {
    const [modal, setModal] = useState(false);
    const [typeValue, setTypeValue] = useState('');
    const [totalScore, setTotalScore] = useState('');
    const [yourScore, setYourScore] = useState('');
    const [comment, setComment] = useState('');

    const toggleModal = () => {
        setModal(!modal)
    }
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://ipfs.io/ipfs/bafyreihzw5tqxigcwn5h2alavycj3jb4v2ossmik3iprvju5hpotqcbfpa/metadata.json');
            const data = await response.json();
            const typeTrait = data.attributes.find(attr => attr.trait_type === 'type');
            setTypeValue(typeTrait.value);
            const totalScoreTrait = data.attributes.find(attr => attr.trait_type === 'Total Score');
            setTotalScore(totalScoreTrait.value);
            const yourScoreTrait = data.attributes.find(attr => attr.trait_type === 'Attendance State');
            setYourScore(yourScoreTrait.value);
            const commentTrait = data.attributes.find(attr => attr.trait_type === 'Comment');
            setComment(commentTrait.value);

          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);   
      

    return(
        <>
        <h2>컴퓨터 네트워크 1분반 출석페이지</h2>
            
        <div className='event-year'>
            
            <Stack direction="row" alignItems="center" spacing={2}>
                <Calendar />
                
                <div className='events-logos'>
                    <a className="event-circle aos-init aos-animate" data-aos="fade-up" onClick={toggleModal}>
                    {modal && (
                        <div className="modal">
                        <div className="overlay"/>
                        <div className="modal-content">
                            <h2>{typeValue}</h2>
                            <p>점수: {yourScore}/{totalScore}</p>
                            <p>Comment <br />{comment}</p>
                        </div>
                        <button className="close-modal"
                        onClick={toggleModal}>Close
                        </button>
                    </div>
                    )}
                    <img src="https://assets.poap.xyz/poap-1000-de-julin-2023-logo-1672770764046.png" alt="POAP 1000 DE JULIN"/>
                    </a>
                </div>
                <div className='events-logos'>
                    <a className="event-circle aos-init aos-animate" data-aos="fade-up" onClick={toggleModal}>
                        <img src="https://assets.poap.xyz/ethrank-season-three-2023-logo-1672072413312.png" alt="ETHRank Season Three"/>
                    
                        {/* {modal && (
                            <div className="modal">
                            <div className="overlay"/>
                            <div className="modal-content">
                                <h2>Homework1</h2>
                                <p>점수: 80/100</p>
                                <p>참잘했어요!</p>
                            </div>
                            <button className="close-modal"
                            onClick={toggleModal}>Close
                            </button>
                        </div>
                        )}   */}
                    </a>
                        

                </div>
                
            </Stack>
            
        </div>

        </>
    );
}