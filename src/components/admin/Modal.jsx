import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useSpring, animated} from 'react-spring';
import styled from 'styled-components';
import Option from './store/Option';
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

// const ModalImg = styled.img`
//   width: 100%;
//   height: 100%;
//   border-radius: 10px 0 0 10px;
//   background: #000;
// `;

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


const Modal = ({toggleModal, setToggleModal, onNewField}) => {
    const modalRef = useRef()
    const [fieldType, SetFieldType] = useState('')
    const [fieldName, SetFieldName] = useState('')
    const [options, SetOptions] = useState([''])
    const [errorMsg, SetErrorMsg] = useState('')

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
    const setType = (e) => {
        SetFieldType(e.target.value)
    }

    const storeOptionValue = (e, index) => {
        const optionsCopy = [...options]
        optionsCopy[index] = e.target.value
        SetOptions(optionsCopy)
    }
    const keyPress = useCallback(
        e => { if (e.key === 'Escape' && toggleModal) setToggleModal(false);}, [toggleModal, setToggleModal]
    )
    const addOption = () => SetOptions([...options, '']);
    
    const handleDelete = (optionIndex) => {
        const newOptions = options.filter( (item, currentIndex) => currentIndex !== optionIndex)
        SetOptions(newOptions)
    }
    useEffect(() => {
        SetErrorMsg("")
        if(options.length === 0 ) SetOptions([''])
    }, [options, fieldType])
    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    )
    const generateOption = () => {
        let newOptions
        if(fieldName==="") return SetErrorMsg("Especificar \"Nombre de opción\"");
        switch (fieldType) {
            case "":
                return SetErrorMsg("Debe de escoger un \"Tipo de campo\"")
            case "text":
                onNewField({fieldType, fieldName})
                setToggleModal(false);
                SetFieldName('')
                SetFieldType('')
                SetOptions([''])
                break;
            default:
                newOptions = options.filter( option => option !== "");
                if(newOptions.length > 0)  {
                    onNewField({fieldType, fieldName, newOptions})
                    setToggleModal(false);
                    SetFieldName('')
                    SetFieldType('')
                    SetOptions([''])
                }
                else return SetErrorMsg('Debe de al menos agregar una opción');
                break;
        }
    }
    return (
        <>
        {toggleModal && (
            <Background ref={modalRef} onClick={closeModal}>
                <animated.div style={animation}>
                    <ModalWrapper>
                        {/* <ModalImg src={img} alt ="camera" /> */}
                        <ModalContent>
                            <h1>Opciones para artículo</h1>

                            <p>Nombre de opción</p>
                            <input onChange={(e) => SetFieldName(e.target.value)} type="text" className="form-control" style={{marginBottom:20}} value={fieldName} />
                            <p>Tipo de campo</p>
                            <select onChange={(e) => setType(e)} value={fieldType} className="form-control">
                                <option value="">Seleccionar</option>
                                <option value="radio">Radio</option>
                                <option value="dropdown">Lista despegable</option>
                                <option value="text">Texto</option>
                            </select>
                            <br />
                            {(fieldType === "radio" || fieldType === "dropdown") &&  options.map( (option, index) => <Option key={index} index={index} onDelete={handleDelete} option={option} storeOptionValue={(e, index) => storeOptionValue(e, index)} /> )}
                            { (fieldType === "radio" || fieldType === "dropdown") && <><button onClick={addOption} className="btn btn-info" style={{marginTop:20}}>Agregar opción</button><br /></> }
                            <p style={{color:"red"}}>{errorMsg}</p>
                            <Button onClick={generateOption}>Crear</Button>
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