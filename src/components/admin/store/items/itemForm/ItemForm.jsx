import ItemFormLogic from './ItemFormLogic.jsx'

import OptionCard from '../OptionCard';
import MeasurementUnitComponent from '../MeasurementUnitComponent';
import PerUnit from '../unitsComponents/PerUnit';
import PerWeight from '../unitsComponents/PerWeight';
import PerVolume from '../unitsComponents/PerVolume'
import ImagesUpload from '../ImagesUpload';
import CategorySelector from '../../../../../features/form/categorySelector/CategorySelector';
import { getCategories } from '../../categories/categoriesServerRequests';


const ItemForm = ({onFireModal, selectedItem, setToggleModal}) => {

    const { handleSetMType, createNewItem, SetItemName, SetImageFiles, SetItemDescription, setMUnitFunc, saveSetChecksFunction, saveSetImages, handleOptionDelete, itemName, itemDescription, mUnit, newItem, errorMsg } = ItemFormLogic(selectedItem)
    
    return (

        <div className="card" style={{width: "35rem", margin:10}}>
            <div className="card-body">
                <h5 className="card-title">Agregar artículo</h5>

                <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>Nombre</h6>
                <input onChange={e => SetItemName(e.target.value)} className="form-control" type="text" placeholder="Nombre" value={itemName} />

                <ImagesUpload passImages={images => SetImageFiles(images)} saveSetImages={saveSetImages} imagesURLs={selectedItem ? selectedItem.imagesFileNames : null} />
                
                <CategorySelector name="Categoría" getListFunction={getCategories} saveSetChecksFunction={saveSetChecksFunction} />

                <h6 className="card-subtitle mb-2 text-muted" style={{marginTop:15}}>Descripción</h6>
                <textarea onChange={e => SetItemDescription(e.target.value)} className="form-control" placeholder="Nombre" rows="4" cols="40" value={itemDescription} />
                
                <MeasurementUnitComponent setMUnit={setMUnitFunc} mUnit={mUnit} />

                {(mUnit==="unit") && <PerUnit onMType={handleSetMType} priceAndUnits={selectedItem ? selectedItem.priceAndUnits : undefined} />}
                {(mUnit==="weight") && <PerWeight onMType={handleSetMType} priceAndUnits={selectedItem ? selectedItem.priceAndUnits : undefined} />}
                {(mUnit==="volume") && <PerVolume onMType={handleSetMType} priceAndUnits={selectedItem ? selectedItem.priceAndUnits : undefined} />}

                <h6 className="card-subtitle mb-2" style={{marginTop:25}}>Opciones:</h6>
                {newItem.options.map((option, currentIndex) => <OptionCard key={currentIndex} index={currentIndex} fieldType={option.fieldType} options={option.newOptions} fieldName={option.fieldName} onDelete={handleOptionDelete} />)}
                {/* If we are editing an object, use this instead  */}
                {/* {editItemOptions.map((option, currentIndex) => <OptionCard key={currentIndex} index={currentIndex} fieldType={option.fieldType} options={option.newOptions} fieldName={option.fieldName} />)} */}

                <p style={{color:"red"}}>{errorMsg}</p>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <button onClick={onFireModal} type="button" className="btn btn-dark" style={{marginTop:10}}>Agregar opción</button>

                    {selectedItem && <button type="button" className="btn btn-danger" style={{marginTop:10}} onClick={()=> setToggleModal()}>Eliminar</button>}

                    <button onClick={createNewItem} type="button" className="btn btn-success" style={{marginTop:10}}>
                        {selectedItem ? <>Guardar Cambios</> : <>Generar Artículo</>}
                    </button>
                </div>
            </div>
        </div>
    )   
}
export default ItemForm;