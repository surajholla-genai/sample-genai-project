
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface LeaderboardEntry {
  id: number;
  username: string;
  score: number;
  quizzesTaken: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ entries }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="border">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-16 text-center">Rank</TableHead>
            <TableHead>Username</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead>Quizzes Taken</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow key={entry.id} className={index < 3 ? "bg-quiz-light" : ""}>
              <TableCell className="font-medium text-center">
                {index === 0 && (
                  <Badge className="bg-yellow-500 text-white">🏆 1st</Badge>
                )}
                {index === 1 && (
                  <Badge className="bg-gray-400 text-white">🥈 2nd</Badge>
                )}
                {index === 2 && (
                  <Badge className="bg-amber-700 text-white">🥉 3rd</Badge>
                )}
                {index > 2 && index + 1}
              </TableCell>
              <TableCell className="font-medium">{entry.username}</TableCell>
              <TableCell className="text-right font-bold">{entry.score}</TableCell>
              <TableCell>{entry.quizzesTaken}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
