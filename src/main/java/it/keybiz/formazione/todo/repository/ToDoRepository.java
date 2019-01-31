package it.keybiz.formazione.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.keybiz.formazione.todo.model.ToDo;

@Repository
public interface ToDoRepository  extends JpaRepository <ToDo, Long> {
	
	
}
