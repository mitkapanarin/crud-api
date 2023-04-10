import { readDataFromFile, writeDataToFile } from "../../utils/utility.js";
const databasePath = "database.json";
import { nanoid } from "nanoid";

export const getAllUsers = (req, res) => {
  readDataFromFile(databasePath, (err, data) => {
    if (err) {
      res.json({
        message: "we have an error",
      });
    } else {
      res.json({
        message: JSON.parse(data),
      });
    }
  });
};

export const createUser = (req, res)=>{
  const newUser = { id: nanoid(), ...req.body };

  readDataFromFile(databasePath, (err, data)=>{
    if(err){
      res.json({message:"user not found"})
    }else{
      const updatedDatabase = [newUser, ...JSON.parse(data)]
      writeDataToFile(databasePath, JSON.stringify(updatedDatabase), (err)=>{
        if(err){
          res.json({
            message:"user was not created"
          })
        }
        else{
          res.json(updatedDatabase)
        }
      })
    }
  })
};

export const deleteUser = (req, res)=>{
  const userID = req.params.id
  readDataFromFile(databasePath, (err, data)=>{
    if(err){
      res.json({message:"file not found"})
    }else{
      const filteredData = JSON.parse(data).filter(item=>item.id !== userID )
      writeDataToFile(databasePath, JSON.stringify(filteredData), (err)=>{
        if(err){
          res.json({message:"operation failed"})
        }else{
          res.json(filteredData)
        }
      })
    }
  })
};

export const updateUser = (req, res)=>{
  const userId = req.params.id
  const requestedChanges = req.body
  readDataFromFile(databasePath, (err, data)=>{
    if(err){
      res.json({message: "file not found"})
    }else{
      const oldData = JSON.parse(data)
      const findUser = {...oldData.find(item=> item.id == userId), ...requestedChanges}
      const updatedUser = [...oldData.filter(item=> item.id !==userId), findUser]
      writeDataToFile(databasePath, JSON.stringify(updatedUser) ,(err)=>{
        if(err){
          res.json({
            message:"database failed"
          })
        }
        else{
          res.json(updatedUser)
        }
      })
    }
  })
}