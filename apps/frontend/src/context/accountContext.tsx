import React, { createContext, useState, ReactNode } from 'react';

interface AccountContextType {
  activeUser: object;
  setActiveUser: React.Dispatch<React.SetStateAction<object>>;
}

export const AccountContext = createContext<AccountContextType>({
  activeUser: {},
  setActiveUser: () => {},
});

interface AccountStateProps {
  children: ReactNode;
}

const AccountState: React.FC<AccountStateProps> = (props) => {
  const [activeUser, setActiveUser] = useState<object>({});

  return (
    <AccountContext.Provider value={{ activeUser, setActiveUser }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountState;
