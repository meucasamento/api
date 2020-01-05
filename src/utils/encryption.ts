import bcrypt from 'bcrypt'

class Encryption {
  async hash (data: string): Promise<string> {
    return bcrypt.hash(data, 10)
  }

  async compare (data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted)
  }
}

export default new Encryption()
