package it.keybiz.formazione.todo.dto;

public class ToDoCheckDTO {
	
	private boolean done;
	
	public ToDoCheckDTO() {}
	
	public ToDoCheckDTO (boolean done) {
		this.setDone(false);
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}

}
