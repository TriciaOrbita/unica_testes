import { ScrollArea } from '@/components/ui/scroll-area'

export function OtherData() {
  return (
    <ScrollArea className="h-[40rem] w-full rounded-lg bg-white mt-2">
      <div className="relative">
        <h2>
          Aqui é um container com scroll, pode colocar os outros componentes e
          informações aqui.
        </h2>
      </div>
    </ScrollArea>
  )
}
