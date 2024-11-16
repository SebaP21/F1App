import React, { createContext, useContext, useState, ReactNode } from 'react';

// Typ dla kolorów zespołów
export type TeamColors = {
  [key: string]: string;
};

// Typ dla kontekstu
interface TeamContextType {
  selectedTeam: string | null;
  teamColor: string | null;
  selectTeam: (teamId: string, color: string) => void;
}

// Typ dla komponentu Providera
interface TeamProviderProps {
  children: ReactNode;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<TeamProviderProps> = ({ children }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [teamColor, setTeamColor] = useState<string | null>(null);

  const selectTeam = (teamId: string, color: string) => {
    setSelectedTeam(teamId);
    setTeamColor(color);
  };

  return (
    <TeamContext.Provider value={{ selectedTeam, teamColor, selectTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = (): TeamContextType => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeamContext must be used within a TeamProvider');
  }
  return context;
};
