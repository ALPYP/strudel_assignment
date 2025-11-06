function PreprocessTextarea({ defaultValue, onChange }) {
  return (
    <>
          <label htmlFor="exampleFormControlTextarea1" className="form-label-text">Text to preprocess:</label>
          <textarea className="form-control-text-area" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
    </>
  );
}

export default PreprocessTextarea;