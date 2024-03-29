/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/4bz0pXv9NZb
 */
import {
  CommandInput,
  CommandItem,
  CommandGroup,
  CommandSeparator,
  CommandList,
  Command,
} from '@/components/ui/command'
import { MenuCommand, MenuCommandType, isCommandType } from '@/types'
import {
  BoldIcon,
  CodeIcon,
  HeadingIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  QuoteIcon,
  TableIcon,
  TextIcon,
  UnderlineIcon,
  VideoIcon,
} from 'lucide-react'
import { useEffect, useRef } from 'react'

type Props = {
  onHideMenu: () => void
  onSelectCommand: (command: MenuCommand) => void
}

export function SlashCommandMenu({ onHideMenu, onSelectCommand }: Props) {
  const commandRef = useRef<HTMLDivElement>(null)
  const commandInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const commandEl = commandRef.current
    if (!commandEl) return
    setTimeout(() => {
      if (commandInputRef.current) {
        commandInputRef.current.focus()
      }
    }, 10)

    const keyDownHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onHideMenu()
        return
      }

      if (event.key === 'Enter') {
        event.preventDefault()
        const commandItems = Array.from(
          commandEl.querySelectorAll('[data-command-menu-item]'),
        )

        const activeItem =
          commandItems.find((item) =>
            item.classList.contains('command-menu-item-active'),
          ) ?? commandItems[0]

        if (!activeItem) return

        const commandType = activeItem.getAttribute(
          'data-command-menu-item-type',
        )

        if (isCommandType(commandType)) {
          onSelectCommand({
            type: commandType,
          })
        }

        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        const commandItems = Array.from(
          commandEl.querySelectorAll('[data-command-menu-item]'),
        )

        const activeItem =
          commandItems.find((item) =>
            item.classList.contains('command-menu-item-active'),
          ) ?? commandItems[0]

        const nextItem =
          commandItems[
            (commandItems.indexOf(activeItem) + 1) % commandItems.length
          ] ?? commandItems[0]
        if (!nextItem || !activeItem) return

        activeItem.classList.remove('command-menu-item-active')
        nextItem.classList.add('command-menu-item-active')

        // scroll into view
        nextItem.scrollIntoView({
          block: 'nearest',
        })
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        const commandItems = Array.from(
          commandEl.querySelectorAll('[data-command-menu-item]'),
        )

        const activeItem =
          commandItems.find((item) =>
            item.classList.contains('command-menu-item-active'),
          ) ?? commandItems[0]

        const nextItem =
          commandItems[
            (commandItems.indexOf(activeItem) - 1) % commandItems.length
          ] ?? commandItems[commandItems.length - 1]

        if (!nextItem || !activeItem) return

        activeItem.classList.remove('command-menu-item-active')
        nextItem.classList.add('command-menu-item-active')

        // scroll into view
        nextItem.scrollIntoView({
          block: 'nearest',
        })
      }
    }

    commandEl.addEventListener('keydown', keyDownHandler)

    return () => {
      commandEl?.removeEventListener('keydown', keyDownHandler)
    }
  }, [onHideMenu, onSelectCommand])

  return (
    <Command
      ref={commandRef}
      className="rounded-lg border border-gray-200 shadow-md dark:border-gray-800"
    >
      <CommandInput
        ref={commandInputRef}
        placeholder="Type a command or search..."
      />
      <CommandList>
        <CommandGroup heading="Text Formatting">
          <CommandItem
            menuCommand={{
              type: MenuCommandType.TEXT_FORMATTING,
            }}
          >
            <BoldIcon className="mr-2 h-4 w-4" />
            <div>Make your text bold</div>
          </CommandItem>
          <CommandItem
            menuCommand={{
              type: MenuCommandType.TEXT_FORMATTING,
            }}
          >
            <ItalicIcon className="mr-2 h-4 w-4" />
            <div>Italicize your text</div>
          </CommandItem>
          <CommandItem
            menuCommand={{
              type: MenuCommandType.TEXT_FORMATTING,
            }}
          >
            <UnderlineIcon className="mr-2 h-4 w-4" />
            <div>Underline your text</div>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Block Types">
          <CommandItem
            menuCommand={{
              type: MenuCommandType.LIST,
            }}
          >
            <ListIcon className="mr-2 h-4 w-4" />
            <div>Create a bulleted list</div>
          </CommandItem>
          <CommandItem
            menuCommand={{
              type: MenuCommandType.LIST,
            }}
          >
            <ListIcon className="mr-2 h-4 w-4" />
            <div>Create a numbered list</div>
          </CommandItem>
          <CommandItem
            menuCommand={{
              type: MenuCommandType.QUOTE,
            }}
          >
            <QuoteIcon className="mr-2 h-4 w-4" />
            <div>Insert a blockquote</div>
          </CommandItem>
          <CommandItem
            menuCommand={{
              type: MenuCommandType.CODE,
            }}
          >
            <CodeIcon className="mr-2 h-4 w-4" />
            <div>Insert code</div>
          </CommandItem>
          <CommandItem
            menuCommand={{
              type: MenuCommandType.TABLE,
            }}
          >
            <TableIcon className="mr-2 h-4 w-4" />
            <div>Insert a table</div>
          </CommandItem>
          <CommandItem
            menuCommand={{
              type: MenuCommandType.HEADING,
            }}
          >
            <HeadingIcon className="mr-2 h-4 w-4" />
            <div>Insert a heading</div>
          </CommandItem>
          {/* paragraph */}
          <CommandItem
            menuCommand={{
              type: MenuCommandType.PARAGRAPH,
            }}
          >
            <TextIcon className="mr-2 h-4 w-4" />
            <div>Insert a paragraph</div>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Embeds">
          <CommandItem
            menuCommand={{
              type: MenuCommandType.EMBED,
            }}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            <div>Embed an image from a URL</div>
          </CommandItem>
          <CommandItem
            menuCommand={{
              type: MenuCommandType.EMBED,
            }}
          >
            <VideoIcon className="mr-2 h-4 w-4" />
            <div>Embed a video from a URL</div>
          </CommandItem>
          <CommandItem
            menuCommand={{
              type: MenuCommandType.LINK,
            }}
          >
            <LinkIcon className="mr-2 h-4 w-4" />
            <div>Embed a link from a URL</div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
