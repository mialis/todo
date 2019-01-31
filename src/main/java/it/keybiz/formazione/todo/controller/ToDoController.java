package it.keybiz.formazione.todo.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import it.keybiz.formazione.todo.dto.ToDoCheckDTO;
import it.keybiz.formazione.todo.model.ToDo;
import it.keybiz.formazione.todo.repository.ToDoRepository;

@RestController
@RequestMapping("/todo")
public class ToDoController {

	@Autowired
	ToDoRepository toDoRepository;

	@GetMapping("")
	public List<ToDo> getAll() {
		return toDoRepository.findAll();
	}

	@PostMapping("")
	public ResponseEntity<Object> create(@RequestBody ToDo toDo) {
		toDo.setDone(false);
		ToDo savedToDo = toDoRepository.save(toDo);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedToDo.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@GetMapping("/{id}")
	public ResponseEntity<ToDo> get(@PathVariable long id) {
		Optional<ToDo> toDo = toDoRepository.findById(id);
		if (toDo.isPresent()) {
			return new ResponseEntity<ToDo>(toDo.get(), HttpStatus.OK);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ToDo> delete(@PathVariable long id) {
		Optional<ToDo> toDo = toDoRepository.findById(id);
		if (toDo.isPresent()) {
			ToDo todo = toDo.get();
			if (todo.isDone()) {
				toDoRepository.deleteById(id);
				return new ResponseEntity<ToDo>(HttpStatus.OK);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping("/{id}/done")
	public ResponseEntity<ToDo> update(@PathVariable("id") long id, @RequestBody ToDoCheckDTO action) {
		Optional<ToDo> toDo = toDoRepository.findById(id);
		if (toDo.isPresent()) {
			ToDo todo = toDo.get();
			if(action.isDone() != todo.isDone()) {
				todo.setDone(action.isDone());
				toDoRepository.save(todo);
				return new ResponseEntity<ToDo>(todo, HttpStatus.OK);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
			}
		} else {
			return ResponseEntity.notFound().build();
		}

	}

}