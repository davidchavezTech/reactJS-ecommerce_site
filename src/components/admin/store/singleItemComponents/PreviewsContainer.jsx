import PreviewDivFromURL from "./PreviewDivFromURL";
const PreviewsContainer = ({ imagesFileNames }) => {
    return (
        <div className="card" style={{width: "90%", display:"inline-block", padding:10, margin:20}}>

            {imagesFileNames && imagesFileNames.map((previewFileName, index) => <PreviewDivFromURL 
                key={index}
                index={index}
                previewFileName={previewFileName}
                remove={(imagesFileNames.length > 1) ? true : false }
            />)}

        </div>
    )
}
export default PreviewsContainer;