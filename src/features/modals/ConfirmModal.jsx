import React, { useEffect, useRef, useCallback} from 'react';
import {useSpring, animated} from 'react-spring';
import styled from 'styled-components';

// import img from './modal.jpg';

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
  padding: 80px 100px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

// const ModalImg = styled.img`
//   width: 100%;
//   height: 100%;
//   border-radius: 10px 0 0 10px;
//   background: #000;
// `;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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


const ConfirmModal = ({toggleModal, setToggleModal, title, confirmToggle}) => {
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
    
    useEffect(() => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        }, [keyPress])

    return (
        <>
        {toggleModal && (
            <Background ref={modalRef} onClick={closeModal}>
                <animated.div style={animation}>
                    <ModalWrapper>
                        {/* <ModalImg src={img} alt ="camera" /> */}
                        <ModalContent>
                            <h1 style={{textAlign:"center"}}>{title}</h1>

                            <br />

                            <div style={{display:"flex", minWidth:300, justifyContent:"space-around"}}>
                                <button onClick={() => setToggleModal()} type="button" className="btn btn-secondary" style={{marginTop:10}}>Cancelar</button>
                                <button onClick={() => confirmToggle()} type="button" className="btn btn-success" style={{marginTop:10}}>Confirmar</button>
                            </div>
                        </ModalContent>
                        <button onClick={() => setToggleModal()} type="button" className="btn-close" aria-label="Close" style={{position:'absolute', right:"15px", top:"15px"}} />
                    </ModalWrapper>
                </animated.div>
            </Background>
        )}
        </>
    )
}
export default ConfirmModal;