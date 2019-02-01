package it.keybiz.formazione.todo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.keybiz.formazione.todo.model.User;

@Repository
public interface UserRepository extends JpaRepository <User, Long> {
	


}
