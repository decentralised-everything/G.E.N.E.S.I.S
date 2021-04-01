import React from "react";

const Transaction = ({ transaction }) => {
  const { input, outputMap } = transaction;
  const recipients = Object.keys(outputMap);

  return (
    <div className="flex justify-center my-3">
      <div className="shadow rounded-lg bg-red-600 px-2 ml-2 w-64 py-2 h-16 px-2 text-white my-auto">
        From: {`@${input.address.substring(0, 9)}...`} | {input.amount}
      </div>
	<div className="flex-col justify-center my-auto">
      {recipients.map((recipient) => (
        <div className="flex-col shadow rounded-lg bg-grey-200 px-2 py-2 ml-2 text-gray-600 my-auto w-64 h-16 px-2" key={recipient}>
          To: {`@${recipient.substring(0, 9)}...`} | {outputMap[recipient]}
        </div>
      ))}
	</div>
    </div>
  );
};

export default Transaction;
