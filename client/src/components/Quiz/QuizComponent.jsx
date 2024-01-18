import React from 'react'
import CustomBtn from '../Button/CustomBtn'

function QuizComponent() {
  return (
    <div className="container-fluid">
      <div className="container mt-4">
        <div className="row mt-3">
          <h3 className='p-4'>Verb Quiz</h3>
          <div className="row mb-5">
             <h6 className="m-2">Q. What does the following function do for a given Linked List with first node as head?</h6>
          </div>
          <div className="row">
                <div className="col-12 col-sm-12 col-lg-6">
                  <div className="shadow-sm d-flex p-3">
                      <input type="checkbox" name="option" id="option1" 
                          className="form-check-input mx-2" value='option1'/>
                      <label className="form-check-label" id="optionEditor1">
                          option1
                      </label>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-lg-6">
                  <div className="shadow-sm d-flex p-3">
                        <input type="checkbox" name="option" id="option1" 
                            className="form-check-input mx-2" value='option1'/>
                        <label className="form-check-label" id="optionEditor1">
                            option2
                        </label>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-lg-6">
                  <div className=" shadow-sm d-flex p-3">
                      <input type="checkbox" name="option" id="option1" 
                          className="form-check-input mx-2" value='option1'/>
                      <label className="form-check-label" id="optionEditor1">
                          option3
                      </label>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-lg-6">
                  <div className="shadow-sm d-flex p-3">
                        <input type="checkbox" name="option" id="option1" 
                            className="form-check-input mx-2" value='option1'/>
                        <label className="form-check-label" id="optionEditor1">
                            option4
                        </label>
                    </div>
                </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default QuizComponent