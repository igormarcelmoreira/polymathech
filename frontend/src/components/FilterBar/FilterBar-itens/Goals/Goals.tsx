import React, { useState, useEffect } from 'react';
import styles from './Goals.style.module.css';

interface Goal {
  id: number;
  text: string;
  completed: boolean;
}

function Goals() {
  const [goals, setGoals] = useState<Goal[]>(JSON.parse(localStorage.getItem('goals') ?? "[]"));
  const [newGoalText, setNewGoalText] = useState<string>('');


  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (newGoalText.trim() !== '') {
      const newGoal = {
        id: goals.length + 1,
        text: newGoalText,
        completed: false,
      };
      setGoals([...goals, newGoal]);
      setNewGoalText(''); 
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addGoal(); 
    }
  };

  const toggleGoalCompletion = (id: number) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === id) {
        return { ...goal, completed: !goal.completed };
      }
      return goal;
    });
    setGoals(updatedGoals);
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__internal}>
        <div className={styles.internal__title}>
          <img src="src/assets/images/list_box.png" alt="Goals Icon" />
          <span>Metas</span>
        </div>
        <div className={styles.internal__subtitle}>
          <span>Estabeleça novas metas para os seus estudos</span>
        </div>
        <div className={styles.internal__inputadd}>
          <input
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua meta..."
            maxLength={100}
            className={styles.internal__input}
          />
          <button onClick={addGoal} className={styles.buttonIcon}>
            <img src="src/assets/images/Add.png" alt="Add Icon" />
          </button>
        </div>
        <div className={styles.goalsPainel}>
          <div className={styles.goalsInfo}>
            <h3> Em Andamento </h3>
            <span>{goals.filter((goal) => !goal.completed).length}</span>
          </div>
          <div className={styles.goalsInfo}>
            <h3> Concluídas </h3>
            <span>{goals.filter((goal) => goal.completed).length}</span>
          </div>
        </div>
        <ul className={styles.internal__list}>
          {goals.map((goal) => (
            <li
              key={goal.id}
              style={{
                textDecoration: goal.completed ? 'line-through' : 'none',
              }}
            >
              <button
                onClick={() => toggleGoalCompletion(goal.id)}
                className={styles.toggleButton}
              >
                {goal.completed ? (
                  <img
                    src="src/assets/images/Completed.png"
                    alt="Completed Icon"
                  />
                ) : (
                  <span className={styles.circleIndicator}> </span>
                )}
              </button>
              <span className={styles.goalText}> 
              {goal.text}
              </span>
              <button
                onClick={() => deleteGoal(goal.id)}
                className={styles.buttonIcon}
              >
                <img src="src/assets/images/Trash.png" alt="Trash Icon" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Goals;
