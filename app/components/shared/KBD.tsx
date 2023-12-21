import React from "react";

const KBD = (props:any) => {
  return (
    <kbd className="mx-2 px-1 py-1 text-sm  text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
      {props?.children}
    </kbd>
  );
};

export default KBD;
