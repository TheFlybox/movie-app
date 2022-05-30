
export function EmptyListComponent(props: { header: string; text: string; }) {
  return (
    <div className="empty-list flex flex-column align-items-center p-5 m-auto mt-3">
      <i className="pi pi-folder-open empty-list-icon text-300"></i>
      <br />
      <div className="content mt-2 text-center">
        <span className="block text-300 text-4xl mb-2">{props.header}</span>
        <span className="block text-200 text-lg">{props.text}</span>
      </div>
    </div>
  )
}