
const Navbar=()=>{
  return (
    <div class="navbar navbar-expand-m navbar-dark bg-dark px-3 shadow"> 
      <a className="navbar-brand fw-bold" href="">
        Todo App
      </a>
      <header class="d-flex justify-content-center py-3">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a href="/todos" class="nav-link text-white" aria-current="page" href->Homes
              </a>
            </li> 
            <li class="nav-item"><a href="/add-task" class="nav-link text-white">Add Task</a>
            </li> 
            <li class="nav-item "><a href="/user-profile" class="nav-link text-white">Profile</a>
            </li> 
            <li class="nav-item"><a href="/logout" class="nav-link text-white">Logout</a>
            </li>
          </ul>
      </header>
    </div>
  )
}

export default Navbar;