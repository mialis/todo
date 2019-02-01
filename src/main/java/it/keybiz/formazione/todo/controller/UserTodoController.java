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

import it.keybiz.formazione.todo.model.UserTodo;
import it.keybiz.formazione.todo.repository.UserTodoRepository;

@RestController
@RequestMapping("/user")
public class UserTodoController {

	@Autowired
	UserTodoRepository userTodoRepository;
	
	@GetMapping("")
	public List<UserTodo> getAll() {
		return userTodoRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<UserTodo> get(@PathVariable long id) {
		Optional<UserTodo> userTodo = userTodoRepository.findById(id);
		if (userTodo.isPresent()) {
			return new ResponseEntity<UserTodo>(userTodo.get(), HttpStatus.OK);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
