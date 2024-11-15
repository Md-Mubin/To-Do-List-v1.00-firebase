// ================== All Imports
import                       './ToDoList.css'
import { FiEdit }       from 'react-icons/fi'
import { FaSave }       from 'react-icons/fa'
import { SparklesCore } from "../ui/sparkles";
import { FaCheck, FaRegTrashCan } from 'react-icons/fa6'
import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database'

const ToDoList = () => {

  // ================== All useStates Hooks
  //---------------------------------------
  const db = getDatabase() // database

  // ------ Common useStates
  const [todo     , setTodo]      = useState("")
  const [todoError, setTodoError] = useState("") // empty input error
  const [allTodo  , setAllTodo]   = useState([]) // reading from firebase and store it

  // ------ useStates for Edit button
  const [editButton, setEditButton] = useState(false) // edit button trinary operator
  const [editedData, setEditedData] = useState("") // to store edited data

  // ------ useStates for check/completed task
  const [checkStatus, setCheckStatus] = useState({}) // Tracks completion status of tasks
  const [checkCount , setCheckCount]  = useState(0) // Tracks the number of completed tasks


  // ================== All Functions
  //----------------------------------

  // ============= Write into Database 
  const handleInput = () => {
    if (!todo) {
      setTodoError("Please Input Something!")

    } else {
      set(push(ref(db, 'ToDoLists/')), { // adding datas in firebase
        todoDatabase: todo
      }).then(() => {
        setTodo("")
      })
    }
  }

  // ============= Read From Database
  useEffect(() => {
    onValue(ref(db, 'ToDoLists/'), (snapshot) => {
      const array = [] 

      snapshot.forEach((firebaseDatas) => {
        array.push({ ...firebaseDatas.val(), uniqeID: firebaseDatas.key })
      })

      setAllTodo(array) // sending recived data from database as An Array
    });

    onValue(ref(db, 'checkStatus/'), (snapshot) => {
      if (snapshot.exists()) {
        setCheckStatus(snapshot.val());
      } else {
        set(ref(db, 'checkStatus/'), {}); // Initialize in Firebase
      }
    });

    onValue(ref(db, 'checkCount/'), (snapshot) => {
      if (snapshot.exists()) {
        setCheckCount(snapshot.val());
      } else {
        set(ref(db, 'checkCount/'), 0); // Initialize in Firebase
      }
    });
  }, [])

  // ============= Delete Lists
  const handleDelete = (deleteDatas) => {
    remove(ref(db, 'ToDoLists/' + deleteDatas.uniqeID))
  }

  // ============= Edit Lists
  const handleEditButton = (editId) => {
    setEditButton(editId.uniqeID)
    setEditedData(editId)
  }

  // ============= Update Edited Data
  const handleUpdate = () => {
    update(ref(db, 'ToDoLists/' + editedData.uniqeID), {
      todoDatabase: editedData.todoDatabase
    }).then(() => {
      setEditButton(null)
    })
  }

  // ============= Complete Task 
  const handleCheckTask = (taskId) => {
    setCheckStatus((prevStatus) => {
      const isTaskCompleted = prevStatus[taskId] || false;

      const updatedStatus = { ...prevStatus, [taskId]: !isTaskCompleted };
      set(ref(db, 'checkStatus/'), updatedStatus); // Sync with Firebase

      const newCheckCount = isTaskCompleted ? checkCount - 1 : checkCount + 1;
      setCheckCount(newCheckCount);
      set(ref(db, 'checkCount/'), newCheckCount); // Sync count with Firebase

      return updatedStatus;
    });
  };


  // ============= Enter Key
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleInput()
    }
  }

  return (
    <>
      <section>

        {/* ============= For Background Npm Package ============= */}
        <SparklesCore
          background="transparent"
          minSize={0.6}
          maxSize={1}
          particleDensity={100}
          className="h-full absolute top-0"
          particleColor="#FFFFFF"
        />

        <ul className="container">
          
          <h1>To-Do-List</h1>

          <li className='headIconArea'><FiEdit className='headIcon' /></li>

          {/* ============= Adding Task Area ============= */}
          <ul className='addTask'>

            <input onKeyDown={(e) => handleEnter(e)} 

              value={todo}

              onChange={(e) => { setTodo(e.target.value), setTodoError("") }}

              type="text" placeholder='Add Task' className='taskInput' />

            <p className='error'>{todoError}</p> {/* emptu input error */}

            <button onClick={(e) => handleInput(e)} className='addTaskButton'>Add Task</button>

            {/* ============== Counters Part ============== */}
            <ul className="counters">
              <li className='counterNumber'>
                {checkCount} 
                <span> / </span>
                {allTodo.length}
              </li>
            </ul>
          </ul>

          {/* ============== All To Do Tasks Area ============== */}
          <ul className='todoTaskArea'>
            {
              allTodo.map((items) => (

                <ul key={items.uniqeID} className='todoTasks'>

                  {/* tasks */}
                  <input

                    value={editButton === items.uniqeID ? editedData.todoDatabase : items.todoDatabase} 

                    onChange={editButton === items.uniqeID ? (e) => setEditedData({ ...editedData, todoDatabase: e.target.value }) : () => { }}

                    type="text" className='taskList' />

                  {/* edit button */}
                  <button onClick={() => editButton === items.uniqeID ? handleUpdate() : handleEditButton(items)} className={`editSaveButton ${checkStatus[items.uniqeID] ? "pointer-events-none opacity-50" : ""}`}>
                    {
                      editButton === items.uniqeID ? <FaSave /> : <FiEdit />
                    }
                  </button>

                  {/* delete button */}
                  <button onClick={() => handleDelete(items)} className={`todoTasksDeleteButton ${checkStatus[items.uniqeID] ? "pointer-events-none opacity-50 shadow-none" : ""}`}><FaRegTrashCan /></button>

                  {/* completed task button */}
                  <button onClick={() => handleCheckTask(items.uniqeID)} className={`p-2 rounded-full text-2xl ${checkStatus[items.uniqeID] ? "completeTask" : "uncompleteTask"}`}><FaCheck /></button>
                </ul>
              ))
            }
          </ul>
        </ul>
      </section>
    </>
  )
}

export default ToDoList