import { prisma } from "@/db";
import { TodoItem } from "@/components/TodoItem";
import Link from "next/link";

function getTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"
  
  await prisma.todo.update({where: {id}, data: {complete}})

} 

export default async function Home () {

  const todos = await getTodos()

  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">Todos</h1> 
        <Link className="border rounded-md border-slate-300 px-2 py-1 hover:bg-slate-700" href="/new">New</Link>
      </header>
      <ul className="py-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} /> 
        ))}
      </ul>
    </>
  )
}

