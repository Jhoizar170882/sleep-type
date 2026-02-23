from typing import TypedDict


class AnimalScores(TypedDict):
    lion: int
    bear: int
    wolf: int
    dolphin: int


class OptionScore(TypedDict):
    a: AnimalScores
    b: AnimalScores
    c: AnimalScores
    d: AnimalScores


QUESTION_SCORES: dict[int, OptionScore] = {
    # Q1: wakeTime
    1: {
        "a": {"lion": 3, "bear": 1, "wolf": 0, "dolphin": 0},
        "b": {"lion": 1, "bear": 3, "wolf": 1, "dolphin": 0},
        "c": {"lion": 0, "bear": 1, "wolf": 3, "dolphin": 1},
        "d": {"lion": 0, "bear": 0, "wolf": 1, "dolphin": 3},
    },
    # Q2: energyPeak
    2: {
        "a": {"lion": 3, "bear": 1, "wolf": 0, "dolphin": 0},
        "b": {"lion": 1, "bear": 3, "wolf": 0, "dolphin": 1},
        "c": {"lion": 0, "bear": 1, "wolf": 3, "dolphin": 1},
        "d": {"lion": 0, "bear": 0, "wolf": 1, "dolphin": 3},
    },
    # Q3: mealPattern
    3: {
        "a": {"lion": 3, "bear": 1, "wolf": 0, "dolphin": 0},
        "b": {"lion": 1, "bear": 3, "wolf": 1, "dolphin": 0},
        "c": {"lion": 0, "bear": 1, "wolf": 3, "dolphin": 1},
        "d": {"lion": 0, "bear": 0, "wolf": 1, "dolphin": 3},
    },
    # Q4: exerciseTime
    4: {
        "a": {"lion": 3, "bear": 1, "wolf": 0, "dolphin": 0},
        "b": {"lion": 1, "bear": 3, "wolf": 1, "dolphin": 0},
        "c": {"lion": 0, "bear": 1, "wolf": 3, "dolphin": 1},
        "d": {"lion": 0, "bear": 0, "wolf": 1, "dolphin": 3},
    },
    # Q5: creativity
    5: {
        "a": {"lion": 3, "bear": 1, "wolf": 0, "dolphin": 0},
        "b": {"lion": 1, "bear": 3, "wolf": 0, "dolphin": 1},
        "c": {"lion": 0, "bear": 0, "wolf": 3, "dolphin": 1},
        "d": {"lion": 0, "bear": 0, "wolf": 1, "dolphin": 3},
    },
    # Q6: socialPreference
    6: {
        "a": {"lion": 3, "bear": 1, "wolf": 0, "dolphin": 0},
        "b": {"lion": 1, "bear": 3, "wolf": 1, "dolphin": 0},
        "c": {"lion": 0, "bear": 1, "wolf": 3, "dolphin": 0},
        "d": {"lion": 1, "bear": 1, "wolf": 1, "dolphin": 3},
    },
    # Q7: sleepOnset
    7: {
        "a": {"lion": 3, "bear": 2, "wolf": 0, "dolphin": 0},
        "b": {"lion": 1, "bear": 3, "wolf": 1, "dolphin": 0},
        "c": {"lion": 0, "bear": 0, "wolf": 3, "dolphin": 1},
        "d": {"lion": 0, "bear": 0, "wolf": 0, "dolphin": 3},
    },
    # Q8: weekendHabit
    8: {
        "a": {"lion": 3, "bear": 1, "wolf": 0, "dolphin": 0},
        "b": {"lion": 1, "bear": 3, "wolf": 1, "dolphin": 0},
        "c": {"lion": 0, "bear": 0, "wolf": 3, "dolphin": 1},
        "d": {"lion": 0, "bear": 0, "wolf": 1, "dolphin": 3},
    },
    # Q9: napPreference
    9: {
        "a": {"lion": 3, "bear": 1, "wolf": 0, "dolphin": 0},
        "b": {"lion": 1, "bear": 3, "wolf": 1, "dolphin": 0},
        "c": {"lion": 0, "bear": 1, "wolf": 3, "dolphin": 1},
        "d": {"lion": 0, "bear": 0, "wolf": 0, "dolphin": 3},
    },
    # Q10: eveningActivity
    10: {
        "a": {"lion": 3, "bear": 1, "wolf": 0, "dolphin": 0},
        "b": {"lion": 1, "bear": 3, "wolf": 1, "dolphin": 0},
        "c": {"lion": 0, "bear": 0, "wolf": 3, "dolphin": 1},
        "d": {"lion": 0, "bear": 0, "wolf": 1, "dolphin": 3},
    },
}

VALID_QUESTION_IDS = set(QUESTION_SCORES.keys())
VALID_OPTION_IDS = {"a", "b", "c", "d"}
CHRONOTYPES = ["lion", "bear", "wolf", "dolphin"]


class ScoringResult(TypedDict):
    chronotype: str
    scores: AnimalScores


def calculate_chronotype(answers: list[dict]) -> ScoringResult:
    totals: AnimalScores = {"lion": 0, "bear": 0, "wolf": 0, "dolphin": 0}

    for answer in answers:
        question_id = answer["questionId"]
        option_id = answer["optionId"]

        if question_id not in VALID_QUESTION_IDS:
            raise ValueError(f"Invalid questionId: {question_id}")
        if option_id not in VALID_OPTION_IDS:
            raise ValueError(f"Invalid optionId: {option_id}")

        option_scores = QUESTION_SCORES[question_id][option_id]
        for animal in CHRONOTYPES:
            totals[animal] += option_scores[animal]

    chronotype = max(CHRONOTYPES, key=lambda a: totals[a])
    return {"chronotype": chronotype, "scores": totals}
