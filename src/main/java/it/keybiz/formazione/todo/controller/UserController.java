package it.keybiz.formazione.todo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.keybiz.formazione.todo.model.User;
import it.keybiz.formazione.todo.repository.UserRepository;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserRepository userTodoRepository;
	
	@GetMapping("")
	public List<User> getAll() {
		return userTodoRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> get(@PathVariable long id) {
		Optional<User> userTodo = userTodoRepository.findById(id);
		if (userTodo.isPresent()) {
			return new ResponseEntity<User>(userTodo.get(), HttpStatus.OK);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
