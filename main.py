import subprocess
import webbrowser
from rich.console import Console
from rich.spinner import Spinner
from time import sleep

console = Console()

def open_links():
    # Open OptimalGrowYT Telegram and YouTube channels
    webbrowser.open("https://t.me/optimalgrowYT")
    webbrowser.open("https://www.youtube.com/@optimalgrowYT/videos")

def main():
    # Print the banner
    console.print("""
+-----------------------------------------------------------------+
|  (`-')                            <-.(`-')            (`-')     |
|  ( OO).->    .->        .->        __( OO)      .->   ( OO).->  |
|,(_/----.(`-')----. (`-')----.     '-'---.\ (`-')----. /    '._  |
||__,    |( OO).-.  '( OO).-.  '    | .-. (/ ( OO).-.  '|'--...__)|
| (_/   / ( _) | |  |( _) | |  |    | '-' `.)( _) | |  |`--.  .--'|
| .'  .'_  \|  |)|  | \|  |)|  |    | /`'.  | \|  |)|  |   |  |   |
||       |  '  '-'  '  '  '-'  '    | '--'  /  '  '-'  '   |  |   |
|`-------'   `-----'    `-----'     `------'    `-----'    `--'   |
+-----------------------------------------------------------------+
""", style="bold magenta")

    # Additional information
    console.print("[bold white]CREATED BY : DR ABDUL MATIN KARIMI: ⨭ [/bold white]" + "[bold blue]https://t.me/doctor_amk[/bold blue]")
    console.print("[white]DOWNLOAD LATEST HACKS HERE ➤ [/white]" + "[blue]https://t.me/optimalgrowYT[/blue]")
    console.print("[red]LEARN HACKING HERE ➤ [/red]" + "[blue]https://www.youtube.com/@optimalgrowYT/videos[/blue]")
    console.print("[red]DOWNLOAD MORE HACKS HERE ➤ [/red]" + "[blue]https://github.com/OptimalGrowYT[/blue]")
    console.print("[yellow]PASTE YOUR QUERY ID INTO DATA.TXT FILE AND PRESS START[/yellow]")
    console.print("[green]                     [𝍖𝍖𝍖 ZOO STORY BOT 𝍖𝍖𝍖]                     [/green]")

    # Open the Telegram and YouTube links
    open_links()

    console.print("[bold magenta]Choose an option:[/bold magenta]")
    console.print("[green]1.[/green] Use with proxy")
    console.print("[green]2.[/green] Use without proxy")
    
    choice = input(" ѲPTЇѪАﾚ GЯѲШ ЧT : ")
    
    if choice == '1':
        with console.status("[bold green]Starting with proxy...[/bold green]", spinner="dots"):
            sleep(2)  # Simulate some delay
            subprocess.run(["node", "zoo-proxy.js"])
    elif choice == '2':
        with console.status("[bold blue]Starting without proxy...[/bold blue]", spinner="dots"):
            sleep(2)  # Simulate some delay
            subprocess.run(["node", "zoo.js"])
    else:
        console.print("[bold red]Invalid choice. Please enter 1 or 2.[/bold red]")

if __name__ == "__main__":
    main()
