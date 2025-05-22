import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, User, LogIn } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // This would normally be tied to actual auth state
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="font-bold text-2xl text-quiz-primary">
          QuistoLearn
        </Link>
      </div>

      {/* Mobile menu */}
      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              <Link to="/" className="text-lg font-medium py-2">
                Home
              </Link>
              <Link to="/categories" className="text-lg font-medium py-2">
                Categories
              </Link>
              <Link to="/leaderboard" className="text-lg font-medium py-2">
                Leaderboard
              </Link>
              <Link to="/create-quiz" className="text-lg font-medium py-2">
                Create Quiz
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="text-lg font-medium py-2">
                    Dashboard
                  </Link>
                  <Button variant="outline" onClick={toggleLogin}>
                    <LogIn className="mr-2 h-4 w-4" /> Log Out
                  </Button>
                </>
              ) : (
                <Button onClick={toggleLogin}>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="font-medium hover:text-quiz-primary transition-colors">
          Home
        </Link>
        <Link to="/categories" className="font-medium hover:text-quiz-primary transition-colors">
          Categories
        </Link>
        <Link to="/leaderboard" className="font-medium hover:text-quiz-primary transition-colors">
          Leaderboard
        </Link>
        <Link to="/create-quiz" className="font-medium hover:text-quiz-primary transition-colors">
          Create Quiz
        </Link>
        
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleLogin}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={toggleLogin}>
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
