"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    // <Popover>
    // 	<PopoverTrigger asChild>
    // 		<Button variant="outline" size="icon">
    // 			<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
    // 			<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    // 			<span className="sr-only">Toggle theme</span>
    // 		</Button>
    // 	</PopoverTrigger>
    // 	<PopoverContent className="max-w-fit p-0">
    // 		<div className="max-w-fit px-6 py-1 flex flex-col justify-center">
    // 			<Button onClick={() => setTheme("light")}>Light</Button>
    // 			<Button onClick={() => setTheme("dark")}>Dark</Button>
    // 			<Button onClick={() => setTheme("system")}>System</Button>
    // 		</div>
    // 		{/* <DropdownMenuContent align="end">
    //  		<DropdownMenuItem onClick={() => setTheme("light")}>
    //  			Light
    //  		</DropdownMenuItem>
    //  		<DropdownMenuItem onClick={() => setTheme("dark")}>
    //  			Dark
    //  		</DropdownMenuItem>
    //  		<DropdownMenuItem onClick={() => setTheme("system")}>
    //  			System
    //  		</DropdownMenuItem>
    //  	</DropdownMenuContent> */}
    // 	</PopoverContent>
    // </Popover>
  );
}
