import React, { useState, ChangeEvent, FormEvent } from "react"
import ReactDOM from "react-dom"
import { ZhaohuFrame } from "./sdk"

function DemoComponent() {
  const [inputs, setInputs] = useState({
    version: '',
    from: 'test',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InJ1YXJ1YXJ1YSIsImZyb20iOiJ0ZXN0IiwiaWF0IjoxNTYwODI1Mjc3LCJleHAiOjE2MjM4OTcyNjV9.fHKbDJtHZJZhq0PI7e9jHsfxCuhEy3Wxf1BIj5egAtY',
    resume: JSON.stringify(resume),
    env: 'mesoor',
  });

  const [zhaohu, setZhaohu] = useState<ZhaohuFrame | undefined>(undefined)

  const [open, setOpen] = useState(false)

  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (zhaohu) {
      zhaohu.remove()
      setZhaohu(undefined)
    } else {
      const newZhaohu = new ZhaohuFrame({
        version: inputs.version ? inputs.version : undefined,
        from: inputs.from,
        token: inputs.token,
        env: inputs.env,
        basicInfoRequest() {
          return Promise.resolve(JSON.parse(inputs.resume))
        }
      })

      setZhaohu(newZhaohu)
    }

    event.preventDefault()
  }

  function handleSwitch() {
    if (!zhaohu) return
    setOpen(!open)
    if (!open) {
      zhaohu.show()
    } else {
      zhaohu.hide()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>版本:
          <input name="version" type="text" value={inputs.version} onChange={handleInput}/>
        </label>
      </div>
      <div>
        <label>渠道:
          <input name="from" type="text" value={inputs.from} onChange={handleInput}/>
        </label>
      </div>
      <div>
        <label>Token:
          <textarea name="token" value={inputs.token} onChange={handleInput} rows={10} cols={50}></textarea>
        </label>
      </div>
      <div>
        <label>初始化简历:
          <textarea name="resume" value={inputs.resume} onChange={handleInput} rows={30} cols={50}></textarea>
        </label>
      </div>
      <div>
        环境:
        <label><input type="radio" name="env" value="nadileaf" checked={inputs.env === "nadileaf"} onChange={handleInput}/>nadileaf</label>
        <label><input type="radio" name="env" value="mesoor" checked={inputs.env === "mesoor"} onChange={handleInput}/>mesoor</label>
      </div>
      <button type="submit">召乎一下</button>
      {
        zhaohu ? 
        (<button type="button" onClick={handleSwitch}>{open ? 'hide' : 'show'}</button>) : 
        (undefined)
      }
    </form>
  )
}

const resume = {
    "eval": "活泼开朗，善于表达，吃苦耐劳，学习能力强，积极向上。",
    "basic": {
        "name": "麦萌",
        "email": "support@mesoor.com",
        "phone": "12345678901",
        "gender": "女",
        "birthday": "1970-01-01",
        "location": {
            "city": "上海"
        },
        "locationId": 310000
    },
    "works": [
        {
            "end_date": "2017-05-19T16:00:00.000Z",
            "position": "产品运营",
            "department": "产品运营部",
            "industry": "1063",
            "salary_low": 4001,
            "salary_high": 6000,
            "until_now": true,
            "start_date": "2017-02-28T16:00:00.000Z",
            "description": "\n· 从测试版上线至今,麦萌一直努力了解每一个职位的岗位职责和具体要求;\n· 麦萌努力收集每一位主动应聘者,运用统一客观公允的标准筛选每一份简历,帮助企业招聘专员避免遗珠之憾;\n· 麦萌负责收集整理自有简历库中的沉淀人才,检索潜在适合的候选人;\n· 麦萌负责为高匹配的候选人协调安排面试,根据候选人的时间安排随时随地进行视频面试;\n· 麦萌负责采集候选人视频面试表现,分析候选人的职责匹配程度,胜任素质潜力和职业性格,优化企业招聘流程。\n",
            "company": "麦穗人工智能"
        }
    ],
    "skills": [],
    "awards": [],
    "version": 1,
    "projects": [],
    "educations": [
        {
            "major": "教育",
            "degree": "学术型硕士",
            "school": "****大学",
            "end_date": "2016-07-01T00:00:00.000Z",
            "start_date": "2013-09-01T00:00:00.000Z"
        }
    ],
    "expectation": {
        "locationIds": [310000],
        "salary_high": 6000,
        "salary_low": 4001,
        "exclude": {
            "companies": [],
            "industries": [],
            "work_types": []
        }
    },
    "skills_text": "不眠不休,兢兢业业"
}

ReactDOM.render(<DemoComponent/>, document.getElementById("root"))