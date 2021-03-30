import React from "react";

const Transaction = ({ transaction }) => {
  const { input, outputMap } = transaction;
  const recipients = Object.keys(outputMap);

  return (
    <div className="flex justify-items-center">
      <div className="transition duration-100 shadow rounded-full bg-grey-200 px-2 ml-2 w-64 px-2">
        From: {`@${input.address.substring(0, 9)}...`}  Balance: {input.amount}
      </div>
      {recipients.map((recipient) => (
        <div className="flex-col transition duration-100 shadow rounded-full bg-grey-200 px-2 ml-2 w-64 px-2" key={recipient}>
          To: {`@${recipient.substring(0, 9)}...`} Sent:{" "}
          {outputMap[recipient]}
        </div>
      ))}
    </div>
  );
};

export default Transaction;
