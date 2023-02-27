import { InputList } from "@/ts/interfaces/interface";
import { useState } from "react";

export default function Input() {
  const [lists, setLists] = useState<InputList[]>([]);
  const [inputList, setInputList] = useState<InputList[]>([
    {
      firstName: "",
      lastName: "",
    },
  ]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    // getting the html element of name and value
    const { name, value } = e.target;

    // spread the array
    const list: any = [...inputList];

    // track the array with the name and index to mutate input value element
    list[index as number][name as keyof InputList] = value;

    // update the UI
    setInputList(list);
  }

  function onSubmit() {
    setLists([...inputList]);
  }

  function handleAddClick() {
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  }
  return (
    <>
      {inputList.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            name="firstName"
            value={item.firstName}
            placeholder="Enter First Name"
            onChange={(e) => handleInputChange(e, index)}
          />
          <input
            type="text"
            name="lastName"
            value={item.lastName}
            placeholder="Enter Last Name"
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      ))}

      <div className="flex items-center space-x-2">
        <button className="text-white bg-violet-400 p-2 rounded-md" onClick={handleAddClick}>
          Add Input field
        </button>
        <button className="text-white bg-violet-400 p-2 rounded-md" onClick={onSubmit}>
          Submit
        </button>
      </div>

      <div>{JSON.stringify(inputList)}</div>
      <hr />
      <h2>Added Input List</h2>

      {lists?.map((list: any, index: number) => (
        <div key={index}>
          {(list.firstName !== "" || list.lastName !== "") && (
            <>
              <p>First Name: {list.firstName}</p>
              <p>Last Name: {list.lastName}</p>
            </>
          )}
        </div>
      ))}
    </>
  );
}
