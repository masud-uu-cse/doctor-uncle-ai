import { Globe } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language === "bn" ? "বাংলা" : "English"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 h-9 px-3 border-teal-500/25 hover:border-teal-500/50 bg-background/50 hover:bg-teal-500/5 dark:hover:bg-teal-500/10 text-xs font-semibold rounded-lg transition-all duration-200"
        >
          <Globe className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400 animate-spin-slow" />
          <span>{currentLang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-border">
        <DropdownMenuItem 
          onClick={() => i18n.changeLanguage("en")} 
          className="font-semibold text-xs cursor-pointer focus:bg-teal-500/10 focus:text-teal-700 dark:focus:text-teal-400"
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => i18n.changeLanguage("bn")} 
          className="font-semibold text-xs cursor-pointer focus:bg-teal-500/10 focus:text-teal-700 dark:focus:text-teal-400"
        >
          বাংলা
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
