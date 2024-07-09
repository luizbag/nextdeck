import { useState } from "react";

export default function PlayerName({
  setPlayerName,
}: {
  setPlayerName: Function;
}) {
  const [inputEnabled, setInputEnabled] = useState(true);
  const [name, setName] = useState("");

  function handleInputBlur() {
    if (!name) return;
    setInputEnabled(false);
    setPlayerName(name);
  }

  return (
    <div className="col-4">
      <p className="fs-2">
        {inputEnabled && (
          <input
            type="text"
            placeholder="User Name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleInputBlur()}
          ></input>
        )}
        {!inputEnabled && (
          <>
            {name}
            <button
              className="btn btn-secondary ms-3"
              onClick={() => setInputEnabled(true)}
            >
              Change Name
            </button>
          </>
        )}
      </p>
    </div>
  );
}
