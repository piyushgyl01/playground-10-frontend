// Form.js
export default function Form({ 
    formData, 
    setFormData, 
    handleSubmit, 
    submitButtonText,
    isLoading,
    error
   }) {
    return (
      <form onSubmit={handleSubmit}>
        {error && <p className="error">Error: {error}</p>}
        {!formData.hasOwnProperty('marks') && isLoading && <p>Loading...</p>}
        
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <br /><br />
        
        <input
          type="number"
          placeholder="Age" 
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: parseFloat(e.target.value) })}
        />
        <br /><br />
        
        <input
          type="text"
          placeholder="Grade"
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
        />
        <br /><br />
        
        <label>Gender: </label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={formData.gender === "Male"}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
        Male
        <input
          type="radio" 
          name="gender"
          value="Female"
          checked={formData.gender === "Female"}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        />
        Female
        <br /><br />
   
        {/* Show these fields only for edit form */}
        {formData.hasOwnProperty('marks') && (
          <>
            <label>Marks: </label>
            <input
              type="number"
              value={formData.marks}
              onChange={(e) => setFormData({ ...formData, marks: parseFloat(e.target.value) })}
            />
            <br /><br />
            
            <label>Attendance: </label>
            <input
              type="number" 
              value={formData.attendance}
              onChange={(e) => setFormData({ ...formData, attendance: parseFloat(e.target.value) })}
            />
            <br /><br />
          </>
        )}
   
        <button type="submit" disabled={isLoading}>
          {submitButtonText}
        </button>
      </form>
    );
   }