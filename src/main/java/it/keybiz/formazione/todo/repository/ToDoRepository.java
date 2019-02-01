package it.keybiz.formazione.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.keybiz.formazione.todo.model.ToDo;

@Repository
public interface ToDoRepository  extends JpaRepository <ToDo, Long> {
	
	@Query(value = "Select * from to_do where (to_do.user_id) = (:userId)", nativeQuery = true)
	List<ToDo> findAllByUserId (@Param("userId") long userId);
}
