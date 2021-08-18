import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useSpring, animated} from 'react-spring';
import styled from 'styled-components';
import img from './modal.jpg';

const Background = styled.div`
  z-index:99999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  min-width: 450px;
  padding: 80px 0;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
    margin-left:60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    //   align-items: center;
    line-height: 1.8;
    color: #141414;
    p {
        margin-bottom: 1rem;
    }
    button {
        padding: 10px 24px;3
        background: #141414;
        color: #fff;
        border: none;
    }
    `;
const Button = styled.button`
    min-width: 100px;
    padding: 16px 32px;
    border-radius: 4px;
    border: none;
    background:#141414;
    color:#fff;
    font-size:24px;
    cursor: pointer;
`


const Modal = ({toggleModal, setToggleModal}) => {
    const modalRef = useRef()

    const animation = useSpring({
        config: {
            duration: 180
        },
        opacity: toggleModal ? 1 : 0,
        transform: toggleModal ? `translateY(0%)` : `translateY(-70%)`
    })
    const closeModal = e => {
        if(modalRef.current === e.target) {
            setToggleModal(false);
        }
    };

    const keyPress = useCallback(
        e => { if (e.key === 'Escape' && toggleModal) setToggleModal(false);}, [toggleModal, setToggleModal]
    )

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    )
    return (
        <>
        {toggleModal && (
            <Background ref={modalRef} onClick={closeModal}>
                <animated.div style={animation}>
                    <ModalWrapper>
                        {/* <ModalImg src={img} alt ="camera" /> */}
                        <ModalContent>
                            <h1>Crear usuario</h1>
                            <p>Nombres: </p>
                            <input type="text" />
                            <br />
                            <p>Email: </p>
                            <input type="text" />
                            <br />
                            <p>Password: </p>
                            <input type="text" />
                            <br />
                            <Button>Crear</Button>
                        </ModalContent>
                        <button onClick={() => setToggleModal()}type="button" className="btn-close" aria-label="Close" style={{position:'absolute', right:"15px", top:"15px"}} />
                    </ModalWrapper>
                </animated.div>
            </Background>
        )}
        </>
    )
}
export default Modal;